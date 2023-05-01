import Course from "../models/course";
import Material from "../models/material";
import { AddMaterialDto } from "../utils/dtos/materialDtos";

export default class MaterialService{
    async addMaterial(addMaterialDto : AddMaterialDto){
        const existCourse = await Course.findById(addMaterialDto.course)
        if (!existCourse) throw new Error('Course not Found!')

        const newMaterial = new Material(addMaterialDto)
        await newMaterial.save()
    }

    async getMaterials(key: string, value : string){
        return await Material.find({[key]: value}).populate('course')
    }
}