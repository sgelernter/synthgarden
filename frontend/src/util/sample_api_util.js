import axios from 'axios';
  
export const createSample = data => {
    return axios.post('/api/samples/', data)
}

export const fetchAllSamples = () => {
    return axios.get("/api/samples")
};

export const fetchUserSamples = userId => {
    return axios.get(`/api/samples/user/${userId}`)
};

export const fetchSample = id => {
    return axios.get(`/api/samples/${id}`)
}

export const deleteSample = id => {
    return axios.delete(`/api/samples/${id}`)
}