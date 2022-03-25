<?php
/**
 * @param string $filename
 * @return string
 */
function rev($filename): string
{
  $manifest_path = realpath(".") . '/../rev-manifest.json';
  if (file_exists($manifest_path)) {
    $manifest = json_decode(file_get_contents($manifest_path), TRUE);
  } else {
    $manifest = [];
  }
  if (array_key_exists($filename, $manifest)) {
    return $manifest[$filename];
  }
  return $filename;
}