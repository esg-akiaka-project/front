

# 하루도약 🍀

![KakaoTalk_20241126_141452542](https://github.com/user-attachments/assets/5a56ea1a-a3c6-48ff-ac4c-55b49a581c00)


<br>

# :date: 프로젝트 개요


| 프로젝트 기간 | 2024.10.03 ~ 2024.11.29 (총 10주) |
| --- | --- |

https://www.notion.so/ruiiary/ESG-SW-PROJECT-1190df5de2c380de90a8d42b237a62ea?pvs=4
<br>
 (프로젝트 notion)

### 기획 배경

<div>

현대인의 일상과 자기성장
현대인들은 바쁜 일상 속에서 자신의 성장을 꾸준히 기록하고 성찰할 기회를 놓치기 쉽습니다. 특히, 감정 변화와 하루의 작은 성취들을 돌아보는 과정은 자기계발과 정신 건강 관리에 중요한 요소입니다. 하지만 기존의 기록 도구들은 단순한 텍스트 입력 방식이거나 사용자가 스스로 분석해야 하는 한계가 있어, 이러한 과정을 습관화하기 어렵게 만듭니다.

개인의 감정과 성장을 지원하는 서비스 필요성
기록뿐만 아니라 사용자에게 감정 기반의 맞춤형 피드백과 격려를 제공하는 서비스가 있다면, 단순 기록을 넘어 동기 부여와 지속적인 성장을 도울 수 있을 것입니다. 특히, AI를 활용한 감정 분석과 개인 맞춤형 피드백은 사용자가 자신의 감정과 행동 패턴을 이해하고 더 나은 방향으로 나아가는 데 도움을 줄 수 있습니다.

‘작은 성취와 감정의 힘’에 주목
‘하루도약’은 하루의 작은 성취와 감정을 기록하며 개인의 성장을 돕는 데 초점을 맞춘 프로젝트입니다. 사용자는 하루의 TIL(Today I Learned)과 감정을 간단히 기록하면, AI가 이를 분석해 공감하거나 응원하는 메시지를 제공합니다. 이를 통해 단순 기록을 넘어 사용자가 자신을 긍정적으로 바라볼 수 있는 계기를 제공합니다.

</div>

### 프로젝트 설명 

<div>
	
#### 하루도약 주요 기능
1. 성장을 위한 회고, 도약기록 작성하기 <br>
2. 도약기록에 대한 응원 편지(OpenAI API 활용) <br>
3. 주간/월간 도약기록 통계 <br>
4. 함께 도약하는, 서로도약 커뮤니티 <br>
<br>

</div>

<br>
<br>

# 📖목차 
- [README](#readme)
	- [🎥 시연 영상](#-시연-영상)
	- [❤ 역할](#-역할)
	- [📂 파일 구조](#-파일-구조)
	- [🛠 기술 스택](#-기술-스택)
	- [🚧 시스템 아키텍쳐](#-시스템-아키텍쳐)
	- [📝 설계 문서](#-설계-문서)
	    - 요구사항 명세서
	    - ERD
        - API 명세서
		- 와이어 프레임
	- [💾 결과물](#-결과물)

<br>
<br>



# 🎥 시연 영상 

<div style="display: flex; justify-content: center; align-items: center; gap: 20px;">

  <div style="text-align: center;">
    <h4>하루도약 기록 업로드</h4>
    <img src="https://github.com/user-attachments/assets/33f4c039-9a0b-4b2e-84ba-3ec2062b7a7a" alt="doyak_upload" style="width: 300px; height: auto;">
  </div>

  <div style="text-align: center;">
    <h4>커뮤니티 글 업로드</h4>
    <img src="https://github.com/user-attachments/assets/098e615c-841f-48de-afea-8e5d78630fe6" alt="seorodoyak" style="width: 300px; height: auto;">
  </div>

  <div style="text-align: center;">
    <h4>알람 기능 시연</h4>
    <img src="https://github.com/user-attachments/assets/86286809-02d2-45ba-aa28-5335ccbb1724" alt="alarm" style="width: 300px; height: auto;">
  </div>

</div>

<br>

# ❤ 역할



|**[박성인](https://github.com/psi7218)**|**[전윤서](https://github.com/ruiiary)**|**[김정아](https://github.com/rmkim7)**|**[이재혁](https://github.com/James-lee978)**|**[배민재](https://github.com/minjae-bae)**|**[구효경](https://github.com/KOOHYO)**|**[현지수](https://github.com/jisoo615)**|
| :---------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------: |
|[<img src="https://avatars.githubusercontent.com/u/133967948?v=4" width="400">](https://github.com/psi7218)| [<img src="https://avatars.githubusercontent.com/u/128672819?v=4" width="400">](https://github.com/ruiiary)| [<img src="https://avatars.githubusercontent.com/u/79951570?v=4" width="400">](https://github.com/rmkim7)| [<img src="https://avatars.githubusercontent.com/u/178907328?v=4" width="400">](https://github.com/James-lee978)  |[<img src="https://avatars.githubusercontent.com/u/178907447?v=4" width="400">](https://github.com/minjae-bae)  | [<img src="https://avatars.githubusercontent.com/u/108776113?v=4" width="400">](https://github.com/KOOHYO)|[<img src="https://avatars.githubusercontent.com/u/57720285?v=4" width="400">](https://github.com/jisoo615) |
|Frontend/팀장|Frontend/발표|Frontend|Frontend|Frontend|Backend|Backend|



<br/>


# 📂 파일 구조

### Front
```
📦front
 ┣ 📂.next
 ┣ 📂node_modules
 ┣ 📂public
 ┣ 📂src
 ┃ ┣ 📂apis
 ┃ ┣ 📂components
 ┃ ┣ 📂context
 ┃ ┣ 📂hook
 ┃ ┣ 📂images
 ┃ ┣ 📂pages
 ┃ ┣ 📂store
 ┃ ┗ 📂types
 ┣ 📜.env
 ┣ 📜.eslintrc.json
 ┣ 📜.gitignore
 ┣ 📜next-env.d.ts
 ┣ 📜next-seo.config.js
 ┣ 📜next.config.mjs
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜tsconfig.json
```
### Back
```
📦harudoyak
 ┣ 📂.github
 ┃ ┣ 📂workflows
 ┃ ┃ ┗ 📜deploy.yml
 ┣ 📂gradle
 ┃ ┣ 📂warpper
 ┃ ┃  ┣ 📜gradle-wrapper.jar
 ┃ ┃  ┗ 📜gradle-wrapper.properties
 ┣ 📂src
 ┃ ┗ 📂main
 ┃   ┣ 📂java
 ┃   ┃ ┗ 📂come.haru.doyak.harudoyak
 ┃   ┃   ┣ 📂annotation
 ┃   ┃   ┣ 📂config
 ┃   ┃   ┣ 📂domain
 ┃   ┃   ┣ 📂dto
 ┃   ┃   ┣ 📂entity
 ┃   ┃   ┣ 📂exception
 ┃   ┃   ┣ 📂interceptor
 ┃   ┃   ┣ 📂repository
 ┃   ┃   ┣ 📂security
 ┃   ┃   ┣ 📂util
 ┃   ┃   ┗ 📜HarudoyakApplication
 ┃   ┗ 📂resources
 ┃     ┣ 📜application.yaml
 ┃     ┗ 📜application-secret.yaml
 ┣ 📜.gitignore
 ┣ 📜build.gradle
 ┣ 📜Dockerfile
 ┣ 📜gradlew
 ┣ 📜gradlew.bat
 ┗ 📜setting.gradle
```

# 🛠 기술 스택


### Front
- Node.js : v20.14.0
- Next.js : v14.2.16
- typescripy : ^5
- react: ^18.3.1
- axios : ^1.7.7
- styled-components: ^6.1.13
- zustand: ^5.0.0

- APIs
  - OPENAI API
  - KAKAO LOGIN API
- Library
	- date-fns: ^4.1.0
  - react-calendar: ^5.1.0
  - react-image-crop: ^11.0.7



### Back

- Intellij : 2023.3.2
- Spring-boot : 3.3.4
- Java : jdk 17.0.9 2023-10-17 LTS
- Gradle : 8.10.2
- Library
    - jjwt: 0.12.5
    - spring-batch: 5.1.2
    - spring-boot-starter-mail: 3.3.4
    - lombok: 1.18.34
    - spring-boot-starter-data-jpa: 3.3.4
    - querydsl: 5.1.0
    - spring-boot-starter-webflux: 3.3.4
    - spring-security-crypto: 6.3.3
- Open API
    - kakao login
    - google login

### DB

- Amazon S3
- Amazon RDS - MySQL : 8.0.34

### CI/CD

- Docker, Docker-compose
- NGINX
- certbot
- Github Action
  
### 협업 툴

- Github
- Notion
- JIRA
- Slack

<br>
<br>



# 🚧 시스템 아키텍쳐

![check drawio](https://github.com/user-attachments/assets/adaa5d57-542e-4b4c-ae30-6e970e4623c9)










# 💾 결과물



### ERD

<details>
<summary>ERD</summary>
<div markdown="1">       
	
![하루도약 ERD](https://github.com/user-attachments/assets/a740d976-1314-45e9-9c39-c8a840817201)
</div>
</details>

### API 명세서

<details>
<summary>API 문서</summary>
<div markdown="1">       
	
- [포스트맨 도큐멘트](https://documenter.getpostman.com/view/29879046/2sAYBPmaND "포스트맨 도큐멘트로 이동")
- [노션 페이지](https://www.notion.so/ruiiary/1190df5de2c38132a4dff37fcb252047?v=c09d6b6805cd4cf29a7d238549b83fbc&pvs=4 "노션 api 설계로 이동")
</div>
</details>

### 최종 결과물 PDF

<details>
<summary>최종 결과물 PDF</summary>
<div markdown="1">       
	
[발표용_하루도약.pdf](https://github.com/user-attachments/files/18051773/_.pdf)
	
[보고서용_하루도약.pdf](https://github.com/user-attachments/files/18051766/_.pdf)


</div>

</details>

<br>







