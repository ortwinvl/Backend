import { Setting } from "../models";
import { IReturnType } from '../interfaces';

class SettingRepository {
    // List all settings for one organisation
    public async listAllSettings(organisationid): Promise<IReturnType> {
        const settings = await Setting.findAll({where : { organisation: organisationid }})
            .then((result) => {
                const settingobject = {};
                for (const s of result) {
                    settingobject[s.settingname] = s.settingvalue;
                  }
                return { result: 1, data: settingobject };
            },
                (err) => { return { result: -1, error: err.message }}
            )
        if (settings)  return settings;
        else return { result: -1, error: "settings not found"}
    }

    // Find a setting by settinggroup
    public async findOneSettingByGroup(organisationid, settingGroup) : Promise<IReturnType> {
        const setting = await Setting.findAll({where: {
            organisation: organisationid,
            settinggroup: settingGroup
        }})
            .then((result) => { return { result: 1, data: result };
            },
                (err) => { return { result: -1, error: err.message } }
            )

        if (setting)  return setting;
        else return { result: -1, error: "Setting not found"}
    }

    // Find a setting by settingname
    public async findOneSettingBySettingName(organisationid, settingName) : Promise<IReturnType> {
        const setting = await Setting.findAll({where: {
            organisation: organisationid,
            settingname: settingName
        }})
            .then((result) => {
                return { result: 1, data: result };
            },
                (err) => { return { result: -1, error: err.message } }
            )

        if (setting)  return setting;
        else return { result: -1, error: "Setting not found" }
    }

    // updateSetting function - To update a setting
    public async updateSetting(organisationid, settingData) : Promise<IReturnType> {
        const setting = await Setting.update({ settingvalue: settingData.settingvalue }, { where: {
            organisation: organisationid,
            settingname: settingData.settingname
        }})
        .then((result) => { return { result: 1, data: result };
        },
            (err) => { return { result: -1, error: err.message } }
        )
    return setting;
    }
}

export { SettingRepository };