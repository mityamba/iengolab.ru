<?  date_default_timezone_set('Asia/Yakutsk');
    $data = $_POST['data'];
    $day = date("d.m.Y");
    $time = date("H:i:s");
    $text = '<p>'.$day.' '.$time.'</p> '.$data.'<br/><br/>'.PHP_EOL;
    $fileRoute = 'text/content.txt';
    $text .= file_get_contents($fileRoute);
    file_put_contents($fileRoute, $text, LOCK_EX); ?>
