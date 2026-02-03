let pick = document.querySelector(".portfolio");
let icons = document.querySelector(".Icons_text h2");
let slider = document.querySelector(".slider");
let navLinks = document.querySelectorAll(".nav_ul li a");

window.addEventListener("scroll", function() {
    let value = window.scrollY;
    let width = window.innerWidth;

    let portfolioTime, iconsTime, aboutTime, projectsTime;

    if (width <= 880) { 
        portfolioTime = 1;  
        iconsTime = 1500;     
        aboutTime = 600;      
        projectsTime = 2500;  
    } else {
        portfolioTime = 400;  
        iconsTime = 2100;     
        aboutTime = 1000;     
        projectsTime = 3900;  
    }

    // 1. Portfolio & Icons 애니메이션
    if (value < portfolioTime) {
        pick.style.animation = 'portfolio_unPick 0.5s ease-out forwards';
    } else {
        pick.style.animation = 'portfolio_pick 0.5s ease-out forwards';
    }

    if (value < iconsTime) {
        icons.style.animation = 'Icons_unPick 0.5s ease-out forwards';
    } else {
        icons.style.animation = 'Icons_pick 1s ease-in-out forwards';
    }

    // 2. 현재 위치 판별
    let currentPos = "";
    if (value > projectsTime) {
        currentPos = "pos-projects";
    } else if (value > aboutTime) {
        currentPos = "pos-about";
    } else {
        currentPos = "pos-welcome";
    }

    // 3. ★ 핵심: 위치가 바뀔 때만 stretching 클래스 추가
    if (!slider.classList.contains(currentPos)) {
        slider.classList.add("stretching");
        
        // 이동 애니메이션 시간에 맞춰 제거 (0.3초)
        setTimeout(() => {
            slider.classList.remove("stretching");
        }, 300);
    }

    // 4. 슬라이더 위치 및 글자색 업데이트 (중복 코드 제거됨)
    slider.classList.remove("pos-welcome", "pos-about", "pos-projects");
    slider.classList.add(currentPos);

    navLinks.forEach((link, index) => {
        link.style.color = "#555"; // 초기화
        if (currentPos === "pos-projects" && index === 2) link.style.color = "white";
        else if (currentPos === "pos-about" && index === 1) link.style.color = "white";
        else if (currentPos === "pos-welcome" && index === 0) link.style.color = "white";
    });
});