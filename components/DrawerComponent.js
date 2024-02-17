import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
export default function DrawerComponent({data}){
    return(
    <Drawer>
        <DrawerTrigger>
          <Button
              disabled={data?.first == "None" ? true : false}
              onClick={() => {
                  console.log("opened");
              }}
          >
              {data?.first == "None" ? 'Result will come soon' : 'View Winners'}
          </Button>
        </DrawerTrigger>
        <DrawerContent className="dark text-white h-[500px]">
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>{data?.name}</DrawerTitle>
                <DrawerDescription>Winners</DrawerDescription>
              </DrawerHeader>
              <Card className="w-auto dark mb-5" >
                    <CardHeader>
                        <CardTitle className="text-2xl font-medium">#First {data?.first}</CardTitle>
                    </CardHeader>
              </Card>
              {data?.second!="None" && 
                <Card className="w-auto dark mb-5" >
                  <CardHeader>
                      <CardTitle className="text-2xl font-medium">#Second {data?.second}</CardTitle>
                  </CardHeader>
                </Card>
              }
              {data?.third!="None" && 
                <Card className="w-auto dark mb-5" >
                  <CardHeader>
                      <CardTitle className="text-2xl font-medium">#Third {data?.third}</CardTitle>
                  </CardHeader>
                </Card>
              }
            </div>
            <DrawerFooter>
                <DrawerClose>
                    <Button className="w-full">Close</Button>
                </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
    </Drawer>
    );
}