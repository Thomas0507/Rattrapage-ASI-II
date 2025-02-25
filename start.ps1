Push-Location .\common-module
Start-Process mvn -ArgumentList 'clean', 'install'
Pop-Location
Start-Process docker -ArgumentList 'compose', 'up' , '--build'