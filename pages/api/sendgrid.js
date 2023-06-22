import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(req, res) {
  const data = req.body;

  try {
    await sendgrid.send({
      to: [
        "admin@adaptive-elearn.com",
        "ernestine.vegah@gmail.com",
        "mbokesalle@gmail.com",
        "adeshealthcare@adaptive-elearn.com",
      ], // email where messages will be received emails
      from: "chenwieugene.j@gmail.com", // your website email address here
      subject: `${data.personalInfo.name} has registered for the healthcare services`,
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html lang="en">
      <head>
        <meta charset="utf-8">
      
        <title>The HTML5 Herald</title>
        <meta name="description" content="ADES-UK registeration">
        <meta name="author" content="https://ades-forms.vercel.app/">
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
      
        <link rel="stylesheet" href="css/styles.css?v=1.0">
      
      </head>
      
      <body>
        <div class="img-container" style="display: flex;justify-content: center;align-items: center;border-radius: 5px;overflow: hidden; font-family: 'helvetica', 'ui-sans';">              
              </div>
              <div class="container" style="margin-left: 20px;margin-right: 20px;">
              <h3>${data.personalInfo.name} has registered. </h3>
              <div style="font-size: 16px;">
              <p>${req.body.personalInfo.name} has shown an interest in our healthcare services and is waiting for feedback.
              </p>
              <br>
              <p>Please go to the <a href="https://ades-forms.vercel.app/dash_board">dashboard</a> and review his/her information</p>
              <br>
              </div>
             
              <p class="footer" style="font-size: 16px;padding-bottom: 20px;border-bottom: 1px solid #D1D5DB;">Best regards<br>Chenwi Eugene</p>
              <div class="footer-links" style="display: flex;justify-content: center;align-items: center;">
                
                <a href="https://www.adaptive-elearn.com/" style="text-decoration: none;margin: 8px;color: #1B2D45;">ADES</a>
   
              </div>
              </div>
      </body>
      </html>`,
    });
  } catch (error) {
    console.log(error);

    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ error: "" });
}

export default sendEmail;
