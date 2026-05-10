# 공도 (디자인 공도)

디자인 스튜디오 '공도'의 공식 홈페이지.

## 구조

```
.
├── index.html
├── css/
│   ├── reset.css
│   └── style.css
├── js/
│   └── main.js
├── assets/
│   ├── favicon.svg
│   └── images/
├── .nojekyll        # GitHub Pages에서 Jekyll 처리 비활성화
└── CNAME            # 커스텀 도메인 연결 시 추가
```

## 로컬 미리보기

빌드 도구 없는 정적 사이트라 아무 정적 서버로 띄우면 됩니다.

```powershell
# 옵션 1: Python
python -m http.server 5500

# 옵션 2: Node (npx)
npx serve .

# 옵션 3: VS Code "Live Server" 확장 → index.html 우클릭 → Open with Live Server
```

브라우저에서 `http://localhost:5500` 접속.

## GitHub Pages 배포

1. GitHub에 새 레포지토리 생성 (예: `gongdo-site`)
2. 로컬에서 push
   ```powershell
   git init
   git add .
   git commit -m "init: 공도 사이트 골격"
   git branch -M main
   git remote add origin https://github.com/<USERNAME>/<REPO>.git
   git push -u origin main
   ```
3. GitHub 레포 → Settings → Pages
   - Source: `Deploy from a branch`
   - Branch: `main` / root (`/`)
4. 몇 분 후 `https://<USERNAME>.github.io/<REPO>/` 에서 접속 가능

## 커스텀 도메인 연결

1. 루트에 `CNAME` 파일 생성, 내용으로 도메인 한 줄만 입력 (예: `gongdo.kr`)
2. 도메인 등록처 DNS 설정:
   - **apex 도메인** (`gongdo.kr`): A 레코드 4개를 GitHub Pages IP로
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - **www 서브도메인**: CNAME 레코드 → `<USERNAME>.github.io`
3. GitHub 레포 → Settings → Pages → Custom domain에 도메인 입력 후 저장
4. DNS 전파 후 "Enforce HTTPS" 체크
