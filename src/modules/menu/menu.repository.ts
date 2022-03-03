import { IQueryResponse } from 'src/interfaces/repository';
import { IMenu } from 'src/interfaces/menu';
import { getRepository } from 'typeorm';
import { Menu } from 'src/database/entity/menu';
import { general } from 'src/config/general';
import to from 'await-to-js';
import { Query } from 'tsoa';
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

    public findMenuParent=async (sequence: number): Promise<IQueryResponse> => {
        
        const Query=getRepository(Menu).findOne({
            where:{
                sequence:sequence,
                parentid:null
            }
        })

        const [error,respose]= await to(Query);        
        if(!respose){
            return {
                statusCode:404,
                message:"MENU_NOT_FOUND"
            }
        }


        const menu=await this.findMenuId(sequence,respose);
       
         return {
             statusCode:menu.statusCode,
             data:menu.data
         }
    }

    private findMenuId=async(sequence: number,menuData:Menu): Promise<IQueryResponse>=>{

         
        const Query=getRepository(Menu).find({
            where:{
                parentid:sequence
            }
        })

        const [error,respose]= await to(Query);  


       const menu=await this.findMenuTree(respose,sequence);
      

        if(!respose){
            // error
            return {
                statusCode:404,
                message:"MENU_NOT_FOUND"
            }
        }


        return {
            statusCode:200,
            data:{
                sequence:menuData.sequence,
                name:menuData.name,
                description:menuData.description,
                menu:menu
            }
        };

    }

    private findMenuTree=async(data: any,sequence:number): Promise<any>=>{
        var nodes: any[]=[];

        data.forEach((item: any) => {
            nodes.push({id:item.sequence,parent:(item.parentid==null)?0:item.parentid});
        });  
        var t = [];
        for (var i = 0; i < nodes.length; i++) {
            t[nodes[i].id] = nodes[i].parent;
        }  
        // agruparlo
        return await this.f(t, sequence);
    }

    private getMenu=async (sequence:number): Promise<IQueryResponse> => {
       
        const Query=getRepository(Menu).findOne({
            where:{
                sequence:sequence
            }
        })
        const [error,respose]= await to(Query);  
        return {
            statusCode: 200,
            data: respose
        }

    }

    private f=async (t: string | any[],c: number): Promise<any>=>{
        // The output structure
        var a = [];
        // We loop through all the nodes to fill `a`
        // console.log(t,"t");
        // console.log(Object.values(t),"t");

        console.log(t,c);
        
        Object.keys(t).forEach(async element => {
         //  if(parseInt(element)===c){
               var i=0;
                const response: IQueryResponse =await this.getMenu(parseInt(element));
                var icon="";
                if(response.data.icon!=null){
                    icon=response.data.icon;
                }
                a.push({
                    id: parseInt(element)  ,
                    title: response.data.name,
                    path: response.data.url,
                    orden: response.data.order,
                    description: response.data.description,
                    status: response.data.status,
                    icon: icon,
                    // The `sub` property's value is generated recursively
                    children: await this.f(t,parseInt(element))
                });
         //  }
            
        });
    

        // Finish by returning the `a` array
        return a;
    }
}
export const menuRepository=new MenuRepository;