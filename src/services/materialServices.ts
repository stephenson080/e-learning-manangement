import Course from "../models/course";
import Material from "../models/material";
import { AddMaterialDto } from "../utils/dtos/materialDtos";
import CloudinaryService from "./cloudinaryService";

const cloudinaryService = new CloudinaryService()
export default class MaterialService{
    async addMaterial(addMaterialDto : AddMaterialDto){
        try {
            const existCourse = await Course.findById(addMaterialDto.course)
            if (!existCourse) throw new Error('Course not Found!')
    
            const uploadedFile = await cloudinaryService.uploadFileToCloud({path: addMaterialDto.file.path})
            if (!uploadedFile) throw new Error('File Upload Error')
            const newMaterial = new Material({url: uploadedFile.url, course: addMaterialDto.course})
            await newMaterial.save() 
        } catch (error) {
            console.log(error, 'mater')
            throw error
        }
    }

    async getMaterials(key: string, value : string){
        return await Material.find({[key]: value}).populate('course')
    }
}