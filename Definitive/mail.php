<?php

use PHPMailer\PHPMailer\PHPMailer;

require './assets/php/phpmailer/Exception.php';
require './assets/php/phpmailer/PHPMailer.php';
require './assets/php/phpmailer/SMTP.php';

/* Validate the e-mail received from the form */
if (isset($_POST['email']) && $_POST['email']) {
    $email = filter_var($_POST['email'], FILTER_SANITIZE_STRING);
} else {
    // set error message and redirect back to form...
    header('location: index.html');
    exit;
}
$showMessage = '';
/* Validanting the captcha and sending the e-mail if the spam filter is passed */
$recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify'; 
$recaptcha_secret = '6Lc-dr0ZAAAAAEVYI6VUQAABx39hKX86nHnGsEFA'; 
$recaptcha_response = $_POST['recaptcha_response']; 
$recaptcha = file_get_contents($recaptcha_url . '?secret=' . $recaptcha_secret . '&response=' . $recaptcha_response); 
$recaptcha = json_decode($recaptcha); 
if($recaptcha->score >= 0.7){
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $comment = $_POST['message'];
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {    
        /* Construct and send the e-mail */
        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->CharSet = 'UTF-8';
        $mail->Host     = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'ippongymzaragoza@gmail.com';
        $mail->addAddress('ippongymzaragoza@gmail.com');
        /* Using Google app password */
        $mail->Password   = 'ycmxgwxwjfcsrjvf';
        // $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        // $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;
        $mail->setFrom('ippongymzaragoza@gmail.com', 'IPPONGYM ZARAGOZA');
        $mail->isHTML(true);
        $mail->Subject = 'Nuevo mensaje a través de la página web';
        $mail->Body = 
        '
        <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                <style>
                    * {
                        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
                    }
                    .wrp-ig-mail-logo {
                        width: 250px;
                    }
                    .wrp-ig-mail-logo img {
                        width: 100%;
                    }
                </style>
            </head>
            <body>
                <h2>Has recibido un nuevo mensaje a través de la web:</h2>
                <h3>Nombre: ' . $name . '</h3>
                <h3>Correo electrónico: ' . $email . '</h3>
                <h3>Teléfono: ' . $phone . '</h3>
                <h3>Mensaje: ' . $comment . '</h3>
            </body>
        </html>
        ';
        $mail->send();
        $showMessage = 'Hemos recibido tu correo electrónico';   
    } else {
        $showMessage =  "Ha ocurrido un error";
    }
} else {
    $showMessage =  "No se ha podido enviar el formulario";
}
echo json_encode($showMessage, JSON_UNESCAPED_UNICODE); 
?>