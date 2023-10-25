export default function userSignupTemplate(name, loginUrl){
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Tech. Edu. || Registration Successful</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: sans-serif;
            }
    
            body {
                min-height: 100vh;
                margin: 0;
                padding: 0;
                text-align: center;
            }
    
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                padding: 10%;
            }
    
            .logo h1,
            .ignoreMsg {
                color: #eab308;
                font-weight: bold;
                letter-spacing: 2px;
                margin-bottom: 10px;
            }
    
            .logo p {
                color: #354659;
                font-weight: bold;
                letter-spacing: 2px;
            }
    
            .heading h1,
            .subHeading {
                color: #354659;
                margin-bottom: 20px;
            }
    
            .link {
                background: #eab308;
                padding: 10px 20px;
                border-radius: 10px;
                margin-bottom: 15px;
              text-align: center;
            }
    
            .link a {
                text-decoration: none;
                color: black;
                font-weight: bold;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <div class="logo">
                <h1>Tech. Edu.</h1>
                <p>an educational platform</p>
            </div>
            <div class="heading">
                <h1>Congratulations ${name}</h1>
                <h1>You are successfully registered with us.</h1>
                <h3>Click on the button below and start your journey of learning</h3>
            </div>
            <div class="message">
                <div class="link">
                    <a href="${loginUrl}" target="_blank">Login Here</a>
                </div>
                <div class="subHeading">
                    If the above link does not work for some reason, please copy and paste this link in a new tab:
                    <br>
                    <a href="${loginUrl}">${loginUrl}</a>
                </div>
            </div>
            <div class="ignoreMsg">
                Thank you for registered with Tech. Edu. an educational platform.
            </div>
        </div>
    </body>
    
    </html>`
}