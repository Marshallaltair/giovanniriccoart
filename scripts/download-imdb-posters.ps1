$ids = @{
  cliffhanger='tt1441251'; pendragon='tt23734948'; ritual='tt13141250';
  suspiria='tt1034415'; diabolik='tt9381682'; ce='tt21800162';
  suburra='tt7197684'; broken='tt4656810'; bianco='tt3439406';
  ricciardi='tt11162652'; mektoub='tt6121444'; tensione='tt9670890'; muti='tt13141250'; eterno='tt27813775'; across='tt5652768'
}
$out = 'C:\Users\giova\Desktop\giovanniriccoart\public\images\film'
New-Item -ItemType Directory -Force $out | Out-Null
$headers = @{ 'User-Agent' = 'Mozilla/5.0' }
foreach ($key in $ids.Keys) {
  $url = "https://www.imdb.com/title/$($ids[$key])/"
  try {
    $html = (Invoke-WebRequest -Uri $url -UseBasicParsing -Headers $headers).Content
    $pattern = '<meta[^>]+property="og:image"[^>]+content="([^"]+)"'
    $match = [regex]::Match($html, $pattern)
    if (-not $match.Success) { $pattern = '<meta[^>]+content="([^"]+)"[^>]+property="og:image"'; $match = [regex]::Match($html, $pattern) }
    if ($match.Success) {
      $image = [System.Net.WebUtility]::HtmlDecode($match.Groups[1].Value).Replace('&amp;','&')
      $file = Join-Path $out "$key.jpg"
      Invoke-WebRequest -Uri $image -OutFile $file -UseBasicParsing -Headers $headers
      Write-Output "$key OK"
    } else { Write-Output "$key NO_IMAGE" }
  } catch { Write-Output "$key ERROR: $($_.Exception.Message)" }
}
