#Remove existing artefacts
rm -f artefacts/payload.zip

#Create lambda payload
zip -r artefacts/payload.zip . -x "*artefacts*" -x "build.sh"