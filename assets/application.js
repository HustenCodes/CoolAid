/* ---- GLOBAL VARIABLES --- */

/* ---- CUSTOM FUNCTIONS ---- */
function update_collection_lists() {
    const collection_lists = document.getElementsByClassName("collection-list");

    for (let i = 0; i < collection_lists.length; i++) {
        const large_screen_version = collection_lists[i].children[0]
        const small_screen_version = collection_lists[i].children[1]

        // Check how if new screen size causes overflow
        large_screen_version.style.display = "flex"
        let is_small = large_screen_version.clientWidth >= large_screen_version.scrollWidth

        // Check if elements are overflowing so we can add a scroll bar
        if (is_small) {
            small_screen_version.style.display = "flex"
            large_screen_version.style.display = "none"
        }
        else {
            small_screen_version.style.display = "none"
            large_screen_version.style.display = "flex"
        }
    }
}

function init_swiper(name = ".swiper", secondary_name = ".swiper", direction = "horizontal", extra_modules = {}) {
    try {
        return swiper = new Swiper(name, {
            direction,
            loop: true,
            pagination: {
                el: `${secondary_name}-pagination`
            },
            navigation: {
                prevEl: `${secondary_name}-button-prev`,
                nextEl: `${secondary_name}-button-next`
            
            },
            ...extra_modules
        })
    }
    catch(e) {
        console.log(e)
    }
}

function init_banner_swiper(name, secondary_name = "swiper") {
    autoscroll_banner = false
    autoscroll_duration = 5

    banner_swiper_element = document.getElementById(name)

    if (!banner_swiper_element) { return }
    if (banner_swiper_element.dataset.autoscroll == null) { return init_swiper("#" + name, "." + secondary_name, "horizontal") }

    if (banner_swiper_element.dataset.autoscroll.toLowerCase() == "true") {
        autoscroll_banner = true
        autoscroll_duration = banner_swiper_element.dataset.autoscroll_duration.valueOf() * 1000
    }

    if (autoscroll_banner) {
        return init_swiper("#" + name, "." + secondary_name, "horizontal", {
            autoplay: {
                delay: autoscroll_duration,
                pauseOnMouseEnter: true
            }
        })
    }

    return init_swiper("#" + name, "." + secondary_name, "horizontal")
}

function main() {
    // Main Swiper
    init_swiper()
    
    // Banner Swiper
    init_banner_swiper("banner-swiper1", "swiper")
    init_banner_swiper("banner-swiper2", "swiper")

    // Init the collection list
    update_collection_lists()
}

/* ---- EVENT LISTENERS ---- */
// Collection List size changes
window.addEventListener("resize", update_collection_lists)

// Horizontal Swiper
document.addEventListener("DOMContentLoaded", main)