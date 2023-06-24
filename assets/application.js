/* ---- GLOBAL VARIABLES --- */

/* ---- CUSTOM FUNCTIONS ---- */
/**
 * Check if an element is currently overflowing no matter if there is a scroll bar ar not.
 * @param {Element} element The element we are checking
 * @returns {boolean}
 */
const is_overflowing = element => element.clientWidth >= element.scrollWidth

/**
 * Switch an element ot a different one if it is overflowing
 * @param {Element} after_overflow_element The element that is used by default (no overflow). This element is used for checking overflow.
 * @param {Element} before_overflow_element The element that is used when the before element is overflowing
 * @param {boolean} [should_change_display = true] If it should change the display of the element
 * @param {string} [display_property = "block"] The property used when enabling an element
 * @returns {Element} The new element that was switched to
 */
function switch_if_overflowing(before_overflow_element, after_overflow_element, should_change_display = true, display_property = "block") {
    let old_display = before_overflow_element.style.display
    
    // Default to the before element
    before_overflow_element.style.display = display_property // hidden elements cant overflow
    if (should_change_display) {
        after_overflow_element.style.display = "none"
    }
    // Check how if new screen size causes overflow
    let is_small = is_overflowing(before_overflow_element)

    if (!should_change_display) { // Some times we don't want to change stuff!
        before_overflow_element.style.display = old_display
    }

    // Check if elements are overflowing so we can switch to the new one
    if (is_small) {
        before_overflow_element.style.display = display_property
        after_overflow_element.style.display = "none"
        return before_overflow_element
    }
    else {
        before_overflow_element.style.display = "none"
        after_overflow_element.style.display = display_property
        return after_overflow_element
    }

}

/**
 * Check if a Collection List is overflowing the screen, then switch it to the secondary one that uses a scroll bar.
 */
function update_collection_lists() {
    const collection_lists = document.getElementsByClassName("collection-list");

    for (let i = 0; i < collection_lists.length; i++) {
        const large_screen_version = collection_lists[i].children[0]
        const small_screen_version = collection_lists[i].children[1]

        switch_if_overflowing(large_screen_version, small_screen_version, true, "flex")
    }
}

/**
 * Check if a Review List is overflowing the screen, then switch it to the secondary one that uses a scroll bar.
 */
function update_review_lists() {
    const review_lists = document.getElementsByClassName("review-list");

    for (let i = 0; i < review_lists.length; i++) {
        const large_screen_version = review_lists[i].children[1]
        const small_screen_version = review_lists[i].children[2]

        switch_if_overflowing(large_screen_version, small_screen_version, true, "flex")
    }
}

/**
 * Initialize a SwiperJS Swiper 
 * @param {string} [selector = ".swiper"] The selector for the main swiper element(s)
 * @param {string} [prefix_name = ".swiper"] The prefix for all the other important child elements
 * @param {string} [direction = "horizontal"] The orientation / direction the swiper will go. Either "horizontal" OR "vertical"
 * @param {object} [extra_modules] Eny extra setting (Modules) you want the swiper to have included.
 * @returns {Swiper | null} The newly initialized Swiper
 */
function init_swiper(selector = ".swiper", prefix_name = ".swiper", direction = "horizontal", extra_modules = {}) {
    try {
        return swiper = new Swiper(selector, {
            direction,
            loop: true,
            pagination: {
                el: `${prefix_name}-pagination`
            },
            navigation: {
                prevEl: `${prefix_name}-button-prev`,
                nextEl: `${prefix_name}-button-next`
            
            },
            ...extra_modules
        })
    }
    catch(e) {
        console.error(e)
    }
}

/**
 * Initialize the Swiper element that controls the Banner sections
 * @param {string} name The name of the main swiper element. Used as the suffix to an id selector
 * @param {string} [prefix_name="swiper"] The prefix to the other important childe elements of the swiper
 * @returns {Swiper | null} The newly initialized Swiper
 */
function init_banner_swiper(name, prefix_name = "swiper") {
    autoscroll_banner = false
    autoscroll_duration = 5

    banner_swiper_element = document.getElementById(name)

    if (!banner_swiper_element) { return }
    if (banner_swiper_element.dataset.autoscroll == null) { return init_swiper("#" + name, "." + prefix_name, "horizontal") }

    if (banner_swiper_element.dataset.autoscroll.toLowerCase() == "true") {
        autoscroll_banner = true
        autoscroll_duration = banner_swiper_element.dataset.autoscroll_duration.valueOf() * 1000
    }

    if (autoscroll_banner) {
        return init_swiper("#" + name, "." + prefix_name, "horizontal", {
            autoplay: {
                delay: autoscroll_duration,
                pauseOnMouseEnter: true
            }
        })
    }

    return init_swiper("#" + name, "." + prefix_name, "horizontal")
}

/** Updates eny elements that get swapped out on overflow */
function update_swapables() {
    update_collection_lists()
    update_review_lists()
}

/** The main function that is run when the window finishes loading */
function main() {
    // Main Swiper
    init_swiper()
    
    // Banner Swiper
    init_banner_swiper("banner-swiper1", "swiper")
    init_banner_swiper("banner-swiper2", "swiper")

    // Init the swapable elements
    update_swapables()
}

/* ---- EVENT LISTENERS ---- */
// Collection List size changes
window.addEventListener("resize", update_swapables)

// Horizontal Swiper
document.addEventListener("DOMContentLoaded", main)