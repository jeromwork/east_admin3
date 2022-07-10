export default {

    iservices_connector_url:window.location.host+'/assets/components/eastclinic/iservices/connector.php',

    getConnectorUrl(connector){
        let url = (window.location.host === 'http://localhost:8080/')? '/assets/components/eastclinic/'+connector+'/connector.php': 'http://dev.eastclinic.local/assets/components/eastclinic/'+connector+'/connector.php';
        return url;
    }
}