
const createClient = require("@supabase/supabase-js").createClient
const axios = require("axios")
require('dotenv').config()


const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

async function insertData(title, author, doi) {
    const { data, error } = await supabase
    .from('dois')
    .insert({ 
        title: title, author: author, doi: doi
    })
    .select()
    
    console.log(data)
    console.log(error)
    
}

const dois = ["10.1140/epjb/e2018-90281-7", "10.1007/s00204-017-2048-0", "10.1080/19370679.2008.12023111"]

dois.forEach(doi => {
    axios.get(`https://api.crossref.org/works/${doi}`)
        .then(response => {
            insertData(response.data.message.title[0], `${response.data.message.author[0].given} ${response.data.message.author[0].family}`, response.data.message.DOI)

        })
        .catch(error => {
            // Handle the error
            console.log(error);
        });

})