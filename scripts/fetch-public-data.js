const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(process.cwd(), 'public', 'data', 'local-info.json');

async function main() {
  const apiKey = process.env.PUBLIC_DATA_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || !geminiKey) {
    console.error("API 키가 설정되지 않았습니다.");
    return;
  }

  // [1단계] 공공데이터포털 API에서 데이터 가져오기
  const url = `https://api.odcloud.kr/api/gov24/v3/serviceList?page=1&perPage=20&returnType=JSON`;
  const response = await fetch(url, {
    headers: {
      "Authorization": apiKey
    }
  });

  if (!response.ok) {
    console.error("공공데이터 API 호출 오류:", response.status);
    return;
  }

  const { data } = await response.json();
  if (!data || data.length === 0) {
    console.error("공공데이터가 없습니다.");
    return;
  }

  // 필터링 로직
  // 1. 부산 포함
  let filtered = data.filter(d => 
    (d.서비스명 && d.서비스명.includes('부산')) ||
    (d.서비스목적요약 && d.서비스목적요약.includes('부산')) ||
    (d.지원대상 && d.지원대상.includes('부산')) ||
    (d.소관기관명 && d.소관기관명.includes('부산'))
  );

  // 2. 부울경(경남) 확인
  if (filtered.length === 0) {
    filtered = data.filter(d => 
      (d.서비스명 && d.서비스명.includes('경남')) ||
      (d.서비스목적요약 && d.서비스목적요약.includes('경남')) ||
      (d.지원대상 && d.지원대상.includes('경남')) ||
      (d.소관기관명 && d.소관기관명.includes('경남'))
    );
  }

  // 3. 없으면 전체 데이터 사용
  if (filtered.length === 0) {
    filtered = data;
  }

  // [2단계] 기존 데이터와 비교
  let existingData = [];
  if (fs.existsSync(DATA_FILE)) {
    try {
      const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
      existingData = JSON.parse(fileContent);
    } catch (e) {
      console.error("기존 기존 데이터(local-info.json) 파싱 오류:", e);
      return;
    }
  }

  const existingNames = new Set(existingData.map(item => item.name));
  const newItemSrc = filtered.find(d => !existingNames.has(d.서비스명));

  if (!newItemSrc) {
    console.log("새로운 데이터가 없습니다");
    return;
  }

  // [3단계] Gemini AI로 새 항목 1개만 가공
  const prompt = `아래 공공데이터 1건을 분석해서 JSON 객체로 변환해줘. 형식:
{id: 숫자, name: 서비스명, category: '행사' 또는 '혜택', startDate: 'YYYY-MM-DD', endDate: 'YYYY-MM-DD', location: 장소 또는 기관명, target: 지원대상, summary: 한줄요약, link: 상세URL}
category는 내용을 보고 행사/축제면 '행사', 지원금/서비스면 '혜택'으로 판단해.
startDate가 없으면 오늘 날짜, endDate가 없으면 '상시'로 넣어.
반드시 JSON 객체만 출력해. 다른 텍스트 없이.

데이터:
${JSON.stringify(newItemSrc)}`;

  const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`;
  const geminiResponse = await fetch(geminiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  if (!geminiResponse.ok) {
    console.error("Gemini API 호출 오류:", geminiResponse.status);
    return;
  }

  const geminiData = await geminiResponse.json();
  let generatedText = geminiData.candidates[0].content.parts[0].text;
  
  // 마크다운 코드블록 제거
  generatedText = generatedText.replace(/```json/g, '').replace(/```/g, '').trim();

  let newItemFormatted;
  try {
    newItemFormatted = JSON.parse(generatedText);
  } catch (e) {
    console.error("Gemini 응답 JSON 파싱 오류:", e);
    return;
  }

  // [4단계] 기존 데이터에 추가
  existingData.push(newItemFormatted);

  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(existingData, null, 2), 'utf-8');
    console.log(`성공적으로 새 항목이 추가되었습니다: ${newItemFormatted.name}`);
  } catch (e) {
    console.error("파일 저장 오류:", e);
  }
}

main().catch(console.error);
