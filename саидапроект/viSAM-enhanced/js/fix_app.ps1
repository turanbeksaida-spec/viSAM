$logic = Get-Content 'app.js' | Select-Object -Skip 441
$logic = $logic -join "`r`n"

# Fix displayResults tags
$logic = $logic -replace 'li\.innerHTML = `<span class="check-icon">вњ“</span> \$\{req\}`;', 'li.innerHTML = `<span class="check-icon">✓</span> ${translation[req] || req}`;'
$logic = $logic -replace 'li\.innerHTML = `<span class="missing-icon">вњ•</span> \$\{doc\}`;', 'li.innerHTML = `<span class="missing-icon">✕</span> ${translation[doc] || doc}`;'
$logic = $logic -replace 'document\.getElementById\(''selected-country-name''\)\.textContent = countryName;', 'const sCountryEl = document.getElementById("selected-country-name"); if(sCountryEl) sCountryEl.textContent = translation[countryName] || countryName;'

# Fix scrambled title
$logic = $logic -replace 'VISA - РЈРїСЂР°РІР»РµРЅРёРµ РґРѕРєСѓРјРµРЅС‚Р°РјРё', 'viSAM - Управление документами'

# Global character fixes
$logic = $logic -replace 'вњ“', '✓'
$logic = $logic -replace 'вљ пёЏ', '⚠️'
$logic = $logic -replace 'вљ ', '⚠️'
$logic = $logic -replace 'вќЊ', '❌'
$logic = $logic -replace 'рџЋЇ', '🎯'
$logic = $logic -replace 'рџ‘Ќ', '👍'
$logic = $logic -replace 'вњ•', '✕'

$logic | Set-Content 'p3.js' -Encoding UTF8
