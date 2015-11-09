<?php
    $json_data = str_replace("\r\n",'',$json_data);
    $json_data = str_replace("\n",'',$json_data);

    $name = $_POST['name'];
    $tel = $_POST['tel'];


    $headers  = "Content-type: text/html; charset=utf-8 \r\n";
    $headers .= "From: manikur\r\n";
    $message = "Имя: ".$name;
    $message .= ", Тел: ".$tel;
    $message = "Удобное время: ".$time;
    $message .= ", Email: ".$email;
    mail("amigo.85@list.ru", "Заявка с сайта", $message, $headers);

    echo $name;
    echo $tel;

    exit;
?>

