import React from "react"
const useTitleCase = (label) => {
    // console.log(label)
    if (label !== undefined) {
        let sentance = label.toLowerCase().split(" ");
        // console.log(sentance);

        for (let i = 0; i < sentance.length; i++) {
            sentance[i] = (sentance[i] !== "" ? sentance[i][0].toUpperCase() + sentance[i].slice(1) : null);
        }
        sentance = sentance.join(" ");
        return sentance;
    }
    return null;
}
export default useTitleCase;
