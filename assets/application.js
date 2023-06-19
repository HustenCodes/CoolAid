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
        console.log(is_small, large_screen_version.clientWidth, large_screen_version.scrollWidth)

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

/* ---- EVENT LISTENERS ---- */
window.addEventListener("resize", update_collection_lists)

/* --- MAIN CODE --- */
update_collection_lists()