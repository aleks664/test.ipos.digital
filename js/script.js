class customSelect {
    constructor(selector) {
        const arrSelect = document.querySelectorAll(selector);
        arrSelect.forEach(select => {
            select.style.display = 'none';
            this.create(select);
        })
        document.addEventListener('click', e => {
            if (!e.target.closest('.custom-select') ) {
                let arrSelectOpen = document.querySelectorAll('.custom-select.is-open')
                arrSelectOpen.forEach(select => {
                    this.close(select, select.querySelector('.custom-select__dropdown'))
                })
            }
        })
    }

    create(select) {
        let arrOptions = select.querySelectorAll('option')
        let cSelect = document.createElement('div')
        cSelect.classList.add('custom-select')
        let cSelectHead = document.createElement('div')
        cSelectHead.classList.add('custom-select__head')
        let cSelectTtl = document.createElement('div')
        cSelectTtl.classList.add('custom-select__ttl')
        let ttl = select.dataset.placeholder ? select.dataset.placeholder : arrOptions[0].textContent
        if (select.dataset.placeholder) {
            cSelectTtl.classList.add('custom-select__ttl_has-placeholder')
        }
        cSelectTtl.textContent = ttl
        let arrow = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        arrow.classList.add('custom-select__arrow')
        arrow.setAttribute('width', '20');
        arrow.setAttribute('height', '20');
        arrow.setAttribute('viewBox', '0 0 20 20');
        let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute(
            'd',
            'M6.175 7.15833L10 10.975L13.825 7.15833L15 8.33333L10 13.3333L5 8.33333L6.175 7.15833Z'
        );
        let cSelectDropdown = document.createElement('div')
        cSelectDropdown.classList.add('custom-select__dropdown')
        arrOptions.forEach((option, index) => {
            let cSelectOption = document.createElement('div');
            cSelectOption.classList.add('custom-select__itm')
            cSelectOption.textContent = option.textContent;
            if (option.dataset.image) {
                let image = document.createElement('img')
                image.classList.add('custom-select__img')
                image.setAttribute('src', option.dataset.image )
                cSelectOption.prepend(image)
            }
            cSelectOption.addEventListener('click', () => {
                select.selectedIndex =  index;
                cSelectTtl.classList.remove('custom-select__ttl_has-placeholder')
                cSelectTtl.textContent = option.textContent;
                if (cSelectDropdown.querySelector('.is-selected')) {
                    cSelectDropdown.querySelector('.is-selected').classList.remove('is-selected')
                }
                cSelectOption.classList.add('is-selected')
                this.close(cSelect, cSelectDropdown)
                let event = new Event('change');
                select.dispatchEvent(event);
            })
            cSelectDropdown.appendChild(cSelectOption)
        })
        arrow.appendChild(path);
        cSelectHead.appendChild(arrow)
        cSelectHead.prepend(cSelectTtl)
        cSelect.appendChild(cSelectHead)
        cSelect.appendChild(cSelectDropdown)
        select.after(cSelect)
        cSelectHead.addEventListener('click', () => {
            this.open(cSelect, cSelectDropdown)
        })
    }

    slideUp(target, duration = 500, callback) {
        target.style.transitionProperty = 'height, margin, padding'
        target.style.transitionDuration = `${duration}ms`
        target.style.boxSizing = 'border-box'
        target.style.height = `${target.offsetHeight}px`
        // eslint-disable-next-line no-unused-expressions
        target.offsetHeight
        target.style.overflow = 'hidden'
        target.style.height = 0
        target.style.paddingTop = 0
        target.style.paddingBottom = 0
        target.style.marginTop = 0
        target.style.marginBottom = 0
        window.setTimeout(() => {
            target.style.display = 'none'
            target.style.removeProperty('height')
            target.style.removeProperty('padding-top')
            target.style.removeProperty('padding-bottom')
            target.style.removeProperty('margin-top')
            target.style.removeProperty('margin-bottom')
            target.style.removeProperty('overflow')
            target.style.removeProperty('transition-duration')
            target.style.removeProperty('transition-property')
            if (callback) {
                callback()
            }
        }, duration)
    }

    slideDown(target, duration = 500, callback) {
        target.style.removeProperty('display')
        let display = window.getComputedStyle(target).display

        if (display === 'none') {
            display = 'block'
        }
        target.style.display = display
        let height = target.offsetHeight
        target.style.overflow = 'hidden'
        target.style.height = 0
        target.style.paddingTop = 0
        target.style.paddingBottom = 0
        target.style.marginTop = 0
        target.style.marginBottom = 0
        // eslint-disable-next-line no-unused-expressions
        target.offsetHeight
        target.style.boxSizing = 'border-box'
        target.style.transitionProperty = 'height, margin, padding'
        target.style.transitionDuration = `${duration}ms`
        target.style.height = `${height}px`
        target.style.removeProperty('padding-top')
        target.style.removeProperty('padding-bottom')
        target.style.removeProperty('margin-top')
        target.style.removeProperty('margin-bottom')
        window.setTimeout(() => {
            target.style.removeProperty('height')
            target.style.removeProperty('overflow')
            target.style.removeProperty('transition-duration')
            target.style.removeProperty('transition-property')
            if (callback) {
                callback()
            }
        }, duration)
    }

    close (select, dropdown){
        select.classList.remove('is-open')
        this.slideUp(dropdown)
    }
    open (select, dropdown) {
        if (select.classList.contains('is-open')) {
            this.close(select, dropdown)
        } else {
            let arrSelectOpen = document.querySelectorAll('.custom-select.is-open')
            arrSelectOpen.forEach(selectOpen=> {
                this.close(selectOpen, selectOpen.querySelector('.custom-select__dropdown'))
            })
            select.classList.add('is-open')
            this.slideDown(dropdown)
        }
    }

}
new customSelect('.js-select')
const selectAlert = document.getElementById('select2');
selectAlert.addEventListener('change', ()=> {
    alert(selectAlert.options[selectAlert.selectedIndex].text)
})

