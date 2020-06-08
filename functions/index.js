const functions = require('firebase-functions');
const cors = require('cors')({origin:true})
const {Storage }  = require('@google-cloud/storage')
const fs = require('fs')
const uuid = require('uuid-v4')
const store = new Storage({

    projectId: 'lambe-f625f',
    keyFilename: 'lambe-f625f.json'

})




 exports.uploadImage = functions.https.onRequest((request, response) => {
  

    
    cors(request, response, () => {
    
        
        try{
           
            
            //Salva temporariamente no disco a imagem
            fs.writeFileSync('/tmp/imageToSave.jpg', request.body.image, 'base64')
     
            //Pega bucket e gera um id
            const bucket = store.bucket('lambe-f625f.appspot.com')
            const id = uuid()
           
            
            //Faz o uploado pro bucket
            bucket.upload('/tmp/imageToSave.jpg',{
                uploadType: 'media',
                destination: `/posts/${id}.jpg`,
                metadata:{
                    metadata:{
                        contentType: 'image/jpeg',
                        firebaseStorageDownloadTokens: id

                    }
                }


            }, (err, file) => {

                if(err){
                    console.log(err)
                    return response.status(500).json({error: err})

                }
                else{
                    //Retorna o link de acesso a imagem para o cliente

                    const fileName = encodeURIComponent(file.name)
                    const imageUrl = 'https://firebasestorage.googleapis.com/v0/b/' 
                    +bucket.name + '/o/' + fileName+ '?alt=media&token=' + id

                    return response.status(201).json({imageUrl})

                }

            })

        }
        catch(err){

            console.log(err)
            return response.status(500).json({error: err})

        }



    })


 });
