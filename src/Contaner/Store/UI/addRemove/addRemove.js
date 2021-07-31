await Object.keys(newData).forEach(async (id) => {
    if (newData[id].SubProduct === property[0]) {
        if (changOver === "add") {
            newData[id].Quantity += n;
        }
        if (changOver === "remove") {
            newData[id].Quantity -= n;
        }
        await axios.put(`https://storemanagement-f0257-default-rtdb.asia-southeast1.firebasedatabase.app/aa/${id}.json`, { ...newData[id] })
    }
})