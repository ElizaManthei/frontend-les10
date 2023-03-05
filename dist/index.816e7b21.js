// import axios from 'axios';
console.log("Hallo daar!");
try {
    const response = await axios.get("https://restcountries.com/v3.1/all\n");
    console.log(response.data.name);
} catch (e) {
    console.error(e);
}

//# sourceMappingURL=index.816e7b21.js.map
