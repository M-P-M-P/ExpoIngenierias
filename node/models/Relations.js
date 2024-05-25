import AreaModel from "./AreaModel.js";
import CategoryModel from "./CategoryModel.js";
import EditionModel from "./EditionModel.js";
import PersonModel from "./PersonModel.js";
import ProjectModel from "./ProjectModel.js";
import StudentModel from "./StudentModel.js";
import TeamModel from "./TeamModel.js";
import MaterialModel from "./MaterialModel.js";
import MaterialProjectModel from "./MaterialProjectModel.js";
import AdminModel from "./AdminsModel.js";
import AnnounceModel from "./AnnounceModel.js";
import MapModel from "./MapModel.js";
import ProjectMapModel from "./ProjectsMaps.js";
import CommentModel from "./CommentsModel.js";
import CriteriaModel from "./CriteriasModel.js";
import CriteriaJudgeModel from "./CriteriaJudgeModel.js";
import DisqualifiedModel from "./DisqualifiedModel.js";


TeamModel.belongsTo(ProjectModel, {foreignKey: 'id_project'});
ProjectModel.hasOne(TeamModel, {foreignKey: 'id_project'});


StudentModel.hasMany(ProjectModel, {foreignKey: 'id_lider'});
ProjectModel.belongsTo(StudentModel, { foreignKey: 'id_lider' });

PersonModel.hasMany(ProjectModel, {foreignKey: 'id_responsable'});
ProjectModel.belongsTo(PersonModel, { foreignKey: 'id_responsable' });

AreaModel.hasMany(ProjectModel, {foreignKey: 'id_area'});
ProjectModel.belongsTo(AreaModel, { foreignKey: 'id_area' });

CategoryModel.hasMany(ProjectModel, {foreignKey: 'id_category'});
ProjectModel.belongsTo(CategoryModel, { foreignKey: 'id_category' });



EditionModel.hasMany(ProjectModel, {foreignKey: 'id_edition'});
PersonModel.hasMany(ProjectModel, {foreignKey: 'id_responsable'});

//Definición de la relacion de admin con anuncios

AdminModel.belongsToMany(AnnounceModel,
        {through: 'admin_announcements',
        foreignKey: 'id_admin',
        otherKey: 'id_announce'
});
AnnounceModel.belongsToMany(AdminModel,
        {through: 'admin_announcements',
        foreignKey: 'id_announce',
        otherKey: 'id_admin'
});

// Definición de la relación desde StudentModel a TeamModel
StudentModel.belongsToMany(TeamModel, {
        through: 'team_members', // Nombre de tu tabla intermedia
        foreignKey: 'id_member', // Nombre de la columna en team_members que referencia estudiantes
        otherKey: 'id_team'

});

TeamModel.belongsToMany(StudentModel, {
        through: 'team_members', // Nombre de tu tabla intermedia
        foreignKey: 'id_team',   // Nombre de la columna en team_members que referencia equipos
        otherKey: 'id_member'
});

      
MaterialModel.belongsToMany(ProjectModel, {
        through: 'materials_projects', // Nombre de tu tabla intermedia
        foreignKey: 'id_material'   // Nombre de la columna en team_members que referencia equipos

});

ProjectModel.belongsToMany(MaterialModel, {
        through: 'materials_projects', // Nombre de tu tabla intermedia
        foreignKey: 'id_project'   // Nombre de la columna en team_members que referencia equipos
});

AdminModel.belongsToMany(ProjectModel,{
        through: 'project_disqualified',
        foreignKey: 'id_admin'
});

ProjectModel.belongsToMany(AdminModel,{
        through: 'project_disqualified',
        foreignKey: 'id_project'
});

StudentModel.hasMany(TeamModel, {foreignKey: 'id_leader'});
TeamModel.belongsTo(StudentModel, {foreignKey: 'id_leader'});

//Mapa

ProjectModel.belongsToMany(MapModel,{
        through: 'projects_maps',
        foreignKey: 'id'
});

MapModel.belongsToMany(ProjectModel,{
        through: 'projects_maps',
        foreignKey: 'id'
});

//comentarios
PersonModel.hasMany(CommentModel,{foreignKey:'id_person'});
CommentModel.belongsTo(PersonModel,{foreignKey:'id'});
ProjectModel.hasMany(CommentModel,{foreignKey:'id_project'});
CommentModel.belongsTo(ProjectModel, { foreignKey: 'id' });

//criterios
CriteriaModel.hasMany(CriteriaJudgeModel,{foreignKey:'id_criteria'});
CriteriaJudgeModel.belongsTo(CriteriaModel,{foreignKey:'id'});

PersonModel.hasMany(CriteriaJudgeModel,{foreignKey:'id_person'});
CriteriaJudgeModel.belongsTo(PersonModel,{foreignKey:'id'});

ProjectModel.hasMany(CriteriaJudgeModel,{foreignKey:'id_project'});
CriteriaJudgeModel.belongsTo(ProjectModel,{foreignKey: 'id'});

export {
        AreaModel,
        CategoryModel,
        EditionModel,
        PersonModel,
        ProjectModel,
        StudentModel,
        TeamModel,
        MaterialModel,
        MaterialProjectModel,
        ProjectMapModel,
        CommentModel,
        MapModel,
        CriteriaJudgeModel,
        CriteriaModel,
        AdminModel,
        AnnounceModel,
        DisqualifiedModel
};