import BottomNavBarComponent from '@/components/BottomNavBarComponent';
import { Button } from '@/components/ui/button';
import { Card, 
    CardContent, 
    CardDescription, 
    CardFooter,
    CardHeader, 
    CardTitle 
} from '@/components/ui/card';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
export default function team() {
    const data = [
                {name:'sreedhar',role:'Developer',github:'mellofordev'},
                {name:'govardhan',role:'Contributor',github:'govardhan2003'},
                {name:'gautham',role:'Contributor',github:'gmbodhi'},
                {name:'pranav',role:'Data Entry',github:''}
                    
                ];
    const docs = `Please nav to README.md in either sstapi or sstsite repos to 
                  get start with the project and the available api endpoints
                `
    const policy = `
    We are committed to protecting the privacy of our users. This Privacy Policy outlines how we collect, use, and safeguard your personal information.
    
    1. **Information Security**:
       - All information collected about you and your activity on our site, including your etlab data, is securely stored in hashed form. This ensures that your data remains protected and cannot be accessed by unauthorized parties.
    
    2. **Data Deletion**:
       - We value your privacy and aim to provide you with control over your data. Your user profile and all associated data will be automatically deleted within one week of your request or account closure.
       - Additionally, all points, program data, and team information associated with your account will also be permanently deleted upon request or account closure.
    
    3. **Non-Use of Data**:
       - We do not sell or use your personal information for any purpose other than to provide you with our services. Your data is strictly used for site functionality and to enhance your user experience.
       - We respect and prioritize your privacy, and we are committed to ensuring that your data remains protected and confidential.
    
    4. **Third-party Services**:
       - We may use third-party services or tools to analyze user activity and improve our services. However, we ensure that these third-party services adhere to strict privacy standards and do not compromise your personal information.
    
    5. **Updates to Privacy Policy**:
       - We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We encourage you to review this Privacy Policy periodically for any updates.
    
    By using sctarts.in, you consent to the terms outlined in this Privacy Policy.
    
    Last updated: 18-02-2024
    
    sctarts.in 
    `
    return (
        <>
        <div className='m-5 mb-20'>
            <h1 className='text-white text-[30px] font-bold'>sctarts.in</h1>
            <div className='m-3'>
            <Card className="w-auto dark mb-5" >
                        <CardHeader>
                            <CardTitle className="text-3xl font-medium">This project is open source and is under MIT License</CardTitle>
                            <CardDescription className="text-1xl">{docs}</CardDescription>
                        </CardHeader>
                        <CardFooter className="flex justify-between">
                            <Button onClick={()=>{
                                window.open(`https://github.com/mellofordev/sstsite`)
                             }}
                             variant="outline"
                             >
                                <GitHubLogoIcon fontSize={24} className='mr-1'/>
                                View source code                     
                            </Button>
                        </CardFooter>
            </Card>
            </div>
            <div className='m-3'>
               {data?.map((profile,index)=>{
                    return(
                    <Card className="w-auto dark mb-5" key={index} >
                        <CardHeader>
                            <CardTitle className="text-3xl font-medium">{profile.name}</CardTitle>
                            <CardDescription className="text-2xl">{profile.role}</CardDescription>
                        </CardHeader>
                        <CardFooter className="flex justify-between">
                             {profile.github!='' && <Button onClick={()=>{
                                window.open(`https://github.com/${profile.github}`)
                             }}>
                                <GitHubLogoIcon fontSize={24} className='mr-1'/>
                                GitHub                            
                             </Button>}
                        </CardFooter>
                    </Card>
                    );
               })}
            </div>
            <div className='m-3'>
            <Card className="w-auto dark mb-5" >
                        <CardHeader>
                            <CardTitle className="text-3xl font-medium">Privacy Policy</CardTitle>
                            <CardDescription className="text-1xl whitespace-pre-wrap">{policy}</CardDescription>
                        </CardHeader>
            </Card>
            </div>
        </div>
        <BottomNavBarComponent/>
        </>
    );
}
