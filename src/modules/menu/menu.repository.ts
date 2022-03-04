import { IQueryResponse } from 'src/interfaces/repository';
import { IMenu } from 'src/interfaces/menu';
import { getRepository } from 'typeorm';
import { Menu } from 'src/database/entity/menu';
import { general } from 'src/config/general';
import to from 'await-to-js';
import { object } from 'joi';

class MenuRepository{

    public create=async (menu: IMenu): Promise<IQueryResponse> => {

       const Query= getRepository(Menu).save(
           {
               createdAt: general.dateNow(),
               updatedAt: general.dateNow(),
               name: menu.name,
               description: menu.description,
               order: menu.order,
               parentid: (menu.parentid==0)?null:menu.parentid,
               status: menu.status,
               url: menu.url,
               icon: menu.icon,
               userCreated: menu.users.data.sequence,
               userUpdated: menu.users.data.sequence
           }
       );

       const [error,result]= await to(Query);
       if(!result){
            return {
                statusCode:404,
                message:"NOT_REQUEST"
            }
       }

        return {
            statusCode:201
        }
    }

    public update=async (menu: IMenu,sequence:number): Promise<IQueryResponse> => {

        const Query= getRepository(Menu).update(
            sequence,
            {
                updatedAt: general.dateNow(),
                name: menu.name,
                description: menu.description,
                order: menu.order,
                parentid: (menu.parentid==0)?null:menu.parentid,
                status: menu.status,
                url: menu.url,
                icon: menu.icon,
                userUpdated: menu.users.data.sequence
            }
        );
 
        const [error,result]= await to(Query);
        if(error || result.affected==0){
             return {
                 statusCode:404,
                 message:"NOT_REQUEST"
             }
        }
 
         return {
             statusCode:201
         }
     }
 
   

    public findMenuParentId=async(sequence: number): Promise<IQueryResponse>=>{

        const QuerySequence=getRepository(Menu).findOne({
            where:{
                sequence:sequence
            }
        })
        const [errorSequence,resposeSequence]= await to(QuerySequence);  
        if(!resposeSequence){
            // error
            return {
                statusCode:404,
                message:"MENU_NOT_FOUND"
            }
        }

        const menu=await this.findMenuTree(sequence);
        return {
            statusCode:200,
            data:{
                sequence:resposeSequence.sequence,
                name:resposeSequence.name,
                description:resposeSequence.description,
                menu:menu
            }
        };
    }


    private findMenuTree=async(parentId:number)=>{

        var menu=[];
        
        const Query=getRepository(Menu).find({
            where:{
                parentid:parentId
            }
        });
        const [error,respose]= await to(Query);

    
        if(respose.length>0){
            
            await Promise.all(respose.map(async (item) => {
                var icon="";
                if(item.icon!=null){
                    icon=item.icon;
                }
                menu.push({
                    id: item.sequence,
                    title: item.name,
                    path: item.url,
                    orden: item.order,
                    description: item.description,
                    status: item.status,
                    icon: icon,
                    // The `sub` property's value is generated recursively
                    children: await this.findMenuTree(item.sequence)
                });
            }));
          
        }

        return menu;
    }
}
export const menuRepository=new MenuRepository;