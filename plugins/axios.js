export default function ({ $axios }) {

    $axios.onResponse(({data}) => {
        return data;
    })
}
