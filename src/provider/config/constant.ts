let isLive = true;

export const url = {
    BASE_URL: isLive ? 
    'https://my-assessment-server.vercel.app/api' 
    : 'http://localhost:5000/api'
}

export const cloudinaryData = {
    CLOUND_NAME: 'trustbreed',
    UPLOAD_PRESET: 'client-upload'
}