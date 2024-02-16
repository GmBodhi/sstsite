import BottomNavBarComponent from '../components/BottomNavBarComponent';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter,
} from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import Footer from '@/components/FooterComponent';
export default function About() {
    return (
        <div className="main">
            <BottomNavBarComponent />
            <div className="m-10 flex flex-col justify-items-center">
                <h1 style={{ color: 'white', fontSize: 55, fontWeight: 'bold', marginTop: 0 }}>Points</h1>
                <Table>
                    <TableCaption className="dark">Point table is not normalized</TableCaption>
                    <TableHeader className="dark">
                        <TableRow className="dark">
                            <TableHead className="w-[100px] text-white">Department</TableHead>
                            <TableHead className="text-right text-white">Points</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="dark text-white">
                        {['CS', 'CL', 'ME', 'MA', 'MP', 'BT', 'ECA', 'ECB'].map((i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell className="font-medium ">{i}</TableCell>
                                    <TableCell className="text-right">0</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                    <TableFooter className="bg-white">
                        <TableRow>
                            <TableCell colSpan={3} className="text-cyan-500">
                                #RANK 1
                            </TableCell>
                            <TableCell className="text-right text-cyan-500">CS</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
                <h1 style={{ color: 'white', fontSize: 55, fontWeight: 'bold', marginTop: 55 }}>Live</h1>
                <p className="text-gray-500 font-medium">Events now happening swipe to see more</p>
                <ScrollArea className="w-full whitespace-nowrap ">
                    <div className="flex w-max space-x-4 p-4">
                        {[1, 2, 3, 4].map((i) => {
                            return (
                                <Card className="w-auto dark mb-5" key={i}>
                                    <CardHeader>
                                        <CardTitle className="text-3xl font-medium">Western Vocal Solo</CardTitle>
                                        <CardDescription>on 16/2/24</CardDescription>
                                    </CardHeader>
                                    <Button className="m-5">Stage #1</Button>
                                </Card>
                            );
                        })}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
                <Footer />
            </div>
        </div>
    );
}
