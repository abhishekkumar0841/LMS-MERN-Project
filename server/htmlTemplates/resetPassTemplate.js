export const resetPassTemplate = (resetPasswordURL)=>{
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Tech. Edu. || Reset Password</title>
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
                background: #1d232a;
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
                <h1>You can reset your password by just clicking on the link below</h1>
            </div>
            <div class="message">
                <div class="link">
                    <a href="${resetPasswordURL}" target="_blank">Reset Your Password</a>
                </div>
                <div class="subHeading">
                    If the above link does not work for some reason, please copy and paste this link in a new tab:
                    <br>
                    <a href="${resetPasswordURL}">${resetPasswordURL}</a>
                </div>
            </div>
            <div class="ignoreMsg">
                If you have not requested this, kindly ignore and enjoy our services.
            </div>
        </div>
    </body>
    
    </html>`
}