export class UserInfo {
    constructor(nameElement, jobElement, avatarElement, api, popupEdit) {
        this._nameElem = nameElement;
        this._jobElem = jobElement;
        this._avatarElem = avatarElement;
        this._job = '';
        this._name = '';
        this._avatar = '';
        this.api = api;
        this.popupEdit = popupEdit;
    }
    setUserInfo = (newName, newJob, newAvatar) => {
        this._name = newName;
        this._job = newJob;
        this._avatar = newAvatar;
    }

    saveToServer = (newName, newJob) => {
        this.api.updateUserInfo(newName, newJob)
            .then(() => {
                this._name = newName;
                this._job = newJob;
                this.updateRender();
                this.popupEdit.close();
            })
            .catch(err => {
                console.log('Ошибка. Запрос не выполнен: ', err);
            })
    }

    getUserInfo = () => {
        return {
            name: this._name,
            job: this._job,
            avatar: this._avatar,
        };
    }
    updateRender = () => {
        this._nameElem.textContent = this._name;
        this._jobElem.textContent = this._job;
        this._avatarElem.style.background = this._avatar;
    }

}