<?php
$cat=$_REQUEST['cat'];

if ($cat==1)
{
  $productos=array('Camisetas','Pantalones','Calcetines');
}
if ($cat==2)
{
  $productos=array('Lápices','Cuadernos','Gomas');
}
if ($cat==3)
{
  $productos=array('Zapatos','Bolsos','Cinturones');
}


$xml="<?xml version=\"1.0\"?>\n";
$xml.="<productos>\n";
for($f=0;$f<count($productos);$f++)
{
$xml.="<producto>".$productos[$f]."</producto>\n";
}
$xml.="</productos>\n";

header('Content-Type: text/xml');

echo $xml;

?>