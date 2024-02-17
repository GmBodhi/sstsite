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
        <DrawerTrigger disabled={data?.first.length==0 ? true : false}>
          <Button
              disabled={data?.first.length==0 ? true : false}
          >
              {data?.first.length==0 ? 'Result will come soon' : 'View Winners'}
          </Button>
        </DrawerTrigger>
        <DrawerContent className="dark text-white h-[500px]">
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>{data?.name}</DrawerTitle>
                <DrawerDescription>Winners</DrawerDescription>
              </DrawerHeader>
              {data?.first!=[] && data.first.map((winner,index)=>{
                return(
                  <Card className="w-auto dark mb-5" key={index} >
                    <CardHeader>
                        <CardTitle className="text-1xl font-medium">#First {winner}</CardTitle>
                    </CardHeader>
                  </Card>
                );
              })}
              {data?.second!=[] && data.second.map((winner,index)=>{
                return(
                  <Card className="w-auto dark mb-5" key={index}>
                    <CardHeader>
                        <CardTitle className="text-1xl font-medium">#Second {winner}</CardTitle>
                    </CardHeader>
                  </Card>
                );
              })}
              {data?.third!=[] && data.third.map((winner,index)=>{
                return(
                  <Card className="w-auto dark mb-5" key={index}>
                    <CardHeader>
                        <CardTitle className="text-1xl font-medium">#Third {winner}</CardTitle>
                    </CardHeader>
                  </Card>
                );
              })}
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