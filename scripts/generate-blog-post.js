const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(process.cwd(), 'public', 'data', 'local-info.json');
const POSTS_DIR = path.join(process.cwd(), 'src', 'content', 'posts');

async function main() {
  const geminiKey = process.env.GEMINI_API_KEY;

  if (!geminiKey) {
    console.error("환경변수 GEMINI_API_KEY가 설정되지 않았습니다.");
    return;
  }

  // [1단계] 최신 데이터 확인
  if (!fs.existsSync(DATA_FILE)) {
    console.error("데이터 파일(local-info.json)을 찾을 수 없습니다.");
    return;
  }

  let data = [];
  try {
    data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  } catch (e) {
    console.error("기존 데이터 읽기 오류:", e);
    return;
  }

  if (data.length === 0) {
    console.error("데이터가 비어있습니다.");
    return;
  }

  const latestItem = data[data.length - 1];
  const serviceName = latestItem.name || latestItem.서비스명 || '이름없음';

  // src/content/posts/ 폴더 확인
  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }

  // 기존 파일들과 비교해서 이미 같은 name으로 글이 있는지 확인
  const existingFiles = fs.readdirSync(POSTS_DIR);
  let isAlreadyPosted = false;

  for (const file of existingFiles) {
    if (!file.endsWith('.md')) continue;
    try {
      const content = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');
      // 제목이나 본문에 해당 서비스명이 포함되어 있으면 작성된 것으로 간주
      if (content.includes(serviceName)) {
        isAlreadyPosted = true;
        break;
      }
    } catch (e) {
      console.error(`파일 읽기 오류 (${file}):`, e);
    }
  }

  if (isAlreadyPosted) {
    console.log("이미 작성된 글입니다");
    return;
  }

  // [2단계] Gemini AI로 블로그 글 생성
  const prompt = `아래 공공서비스 정보를 바탕으로 블로그 글을 작성해줘.

정보: ${JSON.stringify(latestItem, null, 2)}

아래 형식으로 출력해줘. 반드시 이 형식만 출력하고 다른 텍스트는 없이:
---
title: (친근하고 흥미로운 제목)
date: (오늘 날짜 YYYY-MM-DD)
summary: (한 줄 요약)
category: 정보
tags: [태그1, 태그2, 태그3]
---

(본문: 800자 이상, 친근한 블로그 톤, 추천 이유 3가지 포함, 신청 방법 안내)

마지막 줄에 FILENAME: YYYY-MM-DD-keyword 형식으로 파일명도 출력해줘. 키워드는 영문으로.`;

  const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`;
  
  let response;
  try {
    response = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });
  } catch (e) {
    console.error("네트워크 에러 (Gemini API 호출 중):", e);
    return;
  }

  if (!response.ok) {
    console.error("Gemini API 호출 오류:", response.status, response.statusText);
    return;
  }

  const responseData = await response.json();
  let generatedText = responseData.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!generatedText) {
    console.error("Gemini 응답 텍스트를 찾을 수 없습니다.");
    return;
  }

  // [3단계] 파일 저장
  // FILENAME 추출
  const filenameRegex = /FILENAME:\s*([A-Za-z0-9\-_]+(?:\.md)?)/;
  const match = generatedText.match(filenameRegex);
  
  let filename = `${new Date().toISOString().split('T')[0]}-generated-post.md`;
  if (match && match[1]) {
    filename = match[1];
    if (!filename.endsWith('.md')) {
      filename += '.md';
    }
    // 본문에서 FILENAME 줄 제거
    generatedText = generatedText.replace(filenameRegex, '').trim();
  } else {
    // 혹시 매칭되지 않을 경우를 대비해 본문에 포함된 마지막 줄을 한 번 더 제거 시도
    const lines = generatedText.split('\n');
    const lastLine = lines[lines.length - 1];
    if (lastLine.includes('FILENAME:')) {
      const parts = lastLine.split('FILENAME:');
      if (parts.length > 1) {
        filename = parts[1].trim();
        if (!filename.endsWith('.md')) filename += '.md';
        lines.pop();
        generatedText = lines.join('\n').trim();
      }
    }
  }

  const filePath = path.join(POSTS_DIR, filename);

  try {
    fs.writeFileSync(filePath, generatedText, 'utf-8');
    console.log(`성공적으로 블로그 글이 생성되었습니다: ${filename}`);
  } catch (err) {
    console.error("파일 저장 오류:", err);
  }
}

main().catch(console.error);
