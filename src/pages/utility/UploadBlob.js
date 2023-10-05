import axios from 'axios'

export function uploadSuccess({ data }){
    return{
        type: 'UPLOAD_SUCESS',
        data,
    }
}

export function uploadFail({ error }){
    return{
        type: 'UPLOAD_FAIL',
        error,
    }
}

export async function uploadBlob(mediaBlob) {
    if (mediaBlob != null) {
        //Reform audio Data
        var fd = new FormData();
        // const filename = new Date().toISOString();
        // var ReadableStream = mediaBlob.prototype.stream()
        fd.append('audio', mediaBlob);
        
        // Define Data
        const data = {
            headers: { "content-type": "multipart/form-data",
                        "enctype":"multipart/form-data" },
            data: fd
        }

        fetch('http://localhost:5000/uploadAudio', {
            method: 'POST',
            body: data
        });
        // // Post Data
        // await axios.post("/uploadAudio", data)
        //     .then(response => console.log(uploadSuccess(response)))
        //     .catch(error => console.log(uploadFail(error)));

        // var xhr_get_audio = new XMLHttpRequest();
        // xhr_get_audio.open('GET', mediaBlob, true);
        // xhr_get_audio.responseType = 'blob';
        // xhr_get_audio.onload = function(e) {
        //     if (this.status == 200) {
        //         var blob = this.response;
        //         //send the blob to the server
        //         var xhr_send = new XMLHttpRequest();
        //         var filename = new Date().toISOString();
        //         xhr_get_audio.onload = function (e) {
        //             if (this.readyState === 4) {
        //                 console.log("Server returned: ", e.target.responseText);
        //             }
        //         };
        //         var fd = new FormData();
        //         fd.append("audio_data",blob, filename);
        //         xhr_send.open("POST", "http://localhost:5000/uploadAudio",true);
        //         xhr_send.send(fd);
        //     }
        // };
        // await xhr_get_audio.send();

        console.log('blob uploaded to proxy server');
    }
} 
