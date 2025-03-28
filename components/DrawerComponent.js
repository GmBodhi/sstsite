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
    // Check if first, second, or third arrays exist and have entries
    const hasWinners = (data?.first?.length > 0 || data?.second?.length > 0 || data?.third?.length > 0);
    
    return(
    <Drawer>
        <DrawerTrigger>
          <Button disabled={!hasWinners}>
              {hasWinners ? 'View Winners' : 'Results not announced'}
          </Button>
        </DrawerTrigger>
        <DrawerContent className="dark text-white h-[500px]">
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>{data?.name}</DrawerTitle>
                <DrawerDescription>Winners</DrawerDescription>
              </DrawerHeader>
              {data?.first?.length > 0 && data.first.map((winner, index) => (
                <Card className="w-auto dark mb-5" key={index}>
                  <CardHeader>
                      <CardTitle className="text-xl font-medium text-amber-400">#First 🥇 {winner}</CardTitle>
                  </CardHeader>
                </Card>
              ))}
              {data?.second?.length > 0 && data.second.map((winner, index) => (
                <Card className="w-auto dark mb-5" key={index}>
                  <CardHeader>
                      <CardTitle className="text-xl font-medium text-gray-300">#Second 🥈 {winner}</CardTitle>
                  </CardHeader>
                </Card>
              ))}
              {data?.third?.length > 0 && data.third.map((winner, index) => (
                <Card className="w-auto dark mb-5" key={index}>
                  <CardHeader>
                      <CardTitle className="text-xl font-medium text-amber-700">#Third 🥉 {winner}</CardTitle>
                  </CardHeader>
                </Card>
              ))}
              {!hasWinners && (
                <Card className="w-auto dark mb-5">
                  <CardHeader>
                      <CardTitle className="text-xl font-medium">No results announced yet</CardTitle>
                  </CardHeader>
                </Card>
              )}
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