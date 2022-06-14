const express = require("express")
const app = express();
const bodyParser = require("body-parser")
const https = require("https");
const { dirname } = require("path");
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static("public"))
app.get("/", (req, res) => {

    res.sendFile(__dirname + "/index.html")
    console.log(__dirname + "/index.html")

})


app.post("/", (req, res) => {

    const id = "63f02f7be8";
    const url = "https://us13.api.mailchimp.com/3.0/lists/" + id
    const api = "a3ed1d3d48820935d4418d716974550a-us13"

    const data = {
        members: [
            {
                email_address: req.body.email,
                status: "subscribed",
                merge_fields: {
                    "FNAME": req.body.fname,
                    "LNAME": req.body.lname
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data)


    const option = {
        method: "POST",
        auth: "dawit:a3ed1d3d48820935d4418d716974550a-us13"
    }
    const request = https.request(url, option, (response) => {
        response.on("data", (data1) => {

            if (JSON.parse(data1).error_count === 0) {

                res.sendFile(__dirname + "/sucsess.html")
                console.log("sucsess")
            } else {
                console.log(JSON.parse(data1).errors[0].error_code)
                res.sendFile(__dirname + "/fail.html")
            }
        })

    })

    request.write(jsonData)
    request.end()



})

app.post("/fail", (req, res) => {
    res.redirect("/")
})

app.listen(process.env.PORT || 3000, () => {
    console.log("server strated on port 3000")
})



// api
// a3ed1d3d48820935d4418d716974550a-us13


// user Id
// 63f02f7be8