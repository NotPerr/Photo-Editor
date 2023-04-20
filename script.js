const fileInput = document.querySelector(".file-input"),
fileOptions = document.querySelectorAll(".filter button"),
filterName = document.querySelector(".filter-info .name"),
filterValue = document.querySelector(".filter-info .value"),
filterSlider = document.querySelector(".slider input"),
rotateOptions = document.querySelectorAll(".rotate button"),
previewImg = document.querySelector(".preview-img img"),
chooseImgBtn = document.querySelector(".choose-img");

let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
let rotate = 0, flipHorizontal = 1, flipVertical = 1;

const applyFilters = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal},${flipVertical})`;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
}

const loadImage = () => {
    let file = fileInput.files[0];
    if(!file) return;
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load",() => {
        document.querySelector(".container").classList.remove("disable");
    })
}

fileOptions.forEach(option => {
    option.addEventListener("click",() => {
        document.querySelector(".filter .active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;

        if(option.id === "brightness") {
            filterSlider.max = "200";
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`;
        }else if(option.id === "saturation") {
            filterSlider.max = "200";
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`;
        }else if(option.id === "inversion") {
            filterSlider.max = "100";
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`;
        }else {
            filterSlider.max = "100";
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
        }
    });

    
})

const updateFilter = () => {
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".filter .active");

    if(selectedFilter.id === "brightness") {
        brightness = filterSlider.value;
    }else if(selectedFilter.id === "saturation") {
        saturation = filterSlider.value;
    }else if(selectedFilter.id === "inversion") {
        inversion = filterSlider.value;
    }else {
        grayscale = filterSlider.value;
    }

    applyFilters();
}

rotateOptions.forEach(option => {
    option.addEventListener("click",() => {
        if(option.id === "left") {
            rotate -= 90;
        }else if(option.id === "right") {
            rotate += 90;
        }else if(option.id === "horizontal") {
            flipHorizontal = flipHorizontal === 1? -1 : 1;
        }else {
            flipVertical = flipVertical === 1? -1 : 1;
        }
        applyFilters();
    })
})

fileInput.addEventListener("change",loadImage);
filterSlider.addEventListener("input",updateFilter);
chooseImgBtn.addEventListener("click",() => {fileInput.click()});