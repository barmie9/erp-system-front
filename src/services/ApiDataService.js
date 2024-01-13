import axios from "axios";
import AuthenticationHeader from "./AuthenticationHeader";

const apiUrl = 'http://localhost:8080/';
const errorMessage = 'ERROR_API_DATA_ERP_SYSTEM: ';

class ApiDataService {
    getOrders() {
        try {
            return axios.get(apiUrl + 'api/orders', { headers: AuthenticationHeader() });
        }
        catch (error) {
            console.log(errorMessage + "Błąd pobierania zleceń: " + error);
            console.error(errorMessage + "Błąd pobierania zleceń: " + error);
        }
    }

    getSpecializations() {
        try {
            return axios.get(apiUrl + 'api/auth/specializations');
        }
        catch (error) {
            console.log(errorMessage + "Błąd pobierania stanowisk: " + error);
            console.error(errorMessage + "Błąd pobierania stanowisk: " + error);
        }
    }

    getUsers() {
        try {
            return axios.get(apiUrl + 'api/users', { headers: AuthenticationHeader() });
        }
        catch (error) {
            console.log(errorMessage + "Błąd pobierania użytkowników: " + error);
            console.error(errorMessage + "Błąd pobierania użytkowników: " + error);
        }
    }

    getCompanyOrder() {
        return axios.get(apiUrl + 'api/company-orders', { headers: AuthenticationHeader() });
    }

    addCompanyOrder(name, phoneNumber, nipNumber) {
        return axios.post(apiUrl + 'api/add-company', { name, phoneNumber, nipNumber },
            { headers: AuthenticationHeader() });
    }

    deleteCompanyOrder(companyId) {
        return axios.delete(apiUrl + `api/delete-company/${companyId}`, { headers: AuthenticationHeader() });
    }

    addOrder(name, quantity, createDate, expectDate, realDate, orderManagerId, companyOrderId) {
        return axios.post(apiUrl + 'api/addorder', {
            name, quantity, createDate, expectDate, realDate, orderManagerId, companyOrderId
        },
            { headers: AuthenticationHeader() });
    }

    getTasksByOrderId(orderId) {
        return axios.post(apiUrl + 'api/tasks', { orderId }, { headers: AuthenticationHeader() });
    }

    addTask(name, descr, startDate, endDate, userId, orderId, deviceId) {
        return axios.post(apiUrl + 'api/add-task', { name, descr, startDate, endDate, userId, orderId, deviceId },
            { headers: AuthenticationHeader() });
    }

    addTaskFiles(files, taskId) {
        // Formatowanie plików do wysłania
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }
        formData.append('taskId', taskId);

        return axios.post(apiUrl + 'api/add-task-files', formData,
            {
                headers: {
                    ...AuthenticationHeader(),
                    'Content-Type': 'multipart/form-data',
                },
            });
    }

    editOrder(id, name, quantity, companyOrderId, expectDate) {
        return axios.post(apiUrl + 'api/order-edit', { id, name, quantity, companyOrderId, expectDate },
            { headers: AuthenticationHeader() });
    }

    getOrderById(id) {
        return axios.post(apiUrl + 'api/order', { id },
            { headers: AuthenticationHeader() });
    }

    getTasksByUserId(userId) {
        return axios.post(apiUrl + 'api/user-tasks', { userId },
            { headers: AuthenticationHeader() });
    }

    getTaskById(taskId) {
        return axios.post(apiUrl + 'api/task', { taskId },
            { headers: AuthenticationHeader() });
    }

    updateProgresTask(taskId, progress) {
        return axios.post(apiUrl + 'api/update-task-progress', { taskId, progress },
            { headers: AuthenticationHeader() });
    }

    updateTask(taskId, progress, name, descr, start, end) {
        return axios.post(apiUrl + 'api/update-task', { taskId, progress, name, descr, start, end },
            { headers: AuthenticationHeader() });
    }

    deleteFiles(deleteFileIdList) {
        return axios.post(apiUrl + 'api/delete-files', { deleteFileIdList },
            { headers: AuthenticationHeader() });
    }

    getTaskFileList(taskId) {
        const formData = new FormData();

        formData.append('taskId', taskId);

        return axios.post(apiUrl + 'api/get-task-files-list', { taskId },
            { headers: AuthenticationHeader() });
    }

    getSemiProductList() {
        return axios.get(apiUrl + 'api/semi-products', { headers: AuthenticationHeader() });
    }

    addSemiProduct(name, descr, unit, quantity) {
        return axios.post(apiUrl + 'api/add-semi-product', { name, descr, unit, quantity },
            { headers: AuthenticationHeader() });
    }

    updateSemiProductQuantity(id, quantity) {
        return axios.post(apiUrl + 'api/update-semi-product-quantity', { id, quantity },
            { headers: AuthenticationHeader() });
    }

    deleteSemiProduct(id) {
        return axios.post(apiUrl + 'api/delete-semi-product', { id },
            { headers: AuthenticationHeader() });
    }

    getDevices() {
        return axios.get(apiUrl + 'api/devices', { headers: AuthenticationHeader() });
    }

    deleteDevice(id) {
        return axios.post(apiUrl + 'api/delete-device', { id },
            { headers: AuthenticationHeader() });
    }

    addDevice(name, descr, personNum) {
        return axios.post(apiUrl + 'api/add-device', { name, descr, personNum },
            { headers: AuthenticationHeader() });
    }

    async downloadFile(fileId, fileName) {
        const response = await axios.get(apiUrl + `api/get-file/${fileId}`, {
            responseType: 'blob', // Ustawienie responseType na 'blob' dla plików binarnych
            headers: AuthenticationHeader(),
        });

        // Utwórz obiekt URL dla pliku binarnego
        const fileUrl = window.URL.createObjectURL(new Blob([response.data]));

        // Utwórz link do pobrania pliku
        const downloadLink = document.createElement('a');
        downloadLink.href = fileUrl;
        downloadLink.setAttribute('download', fileName); // Ustaw nazwę pliku do pobrania

        // Dodaj link do DOM
        document.body.appendChild(downloadLink);

        // Kliknij link, aby rozpocząć pobieranie
        downloadLink.click();

        // Usuń link z DOM po pobraniu pliku
        document.body.removeChild(downloadLink);

    }

}

export default new ApiDataService();