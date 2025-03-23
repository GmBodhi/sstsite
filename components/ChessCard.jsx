import React from 'react';
import { Tilt } from "@/components/ui/tilt";
import { Spotlight } from "@/components/ui/spotlight";
import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const TiltSpotlight = () => {
  return (
    <div className="aspect-video max-w-sm">
      <Tilt
        rotationFactor={6}
        isRevese
        style={{
          transformOrigin: 'center center',
        }}
        springOptions={{
          stiffness: 26.7,
          damping: 4.1,
          mass: 0.2,
        }}
        className="group relative rounded-lg"
      >
        <Spotlight
          className="z-10 from-white/50 via-white/20 to-white/10 blur-2xl"
          size={248}
          springOptions={{
            stiffness: 26.7,
            damping: 4.1,
            mass: 0.2,
          }}
        />
        <img
          // src="https://images.beta.cosmos.so/f7fcb95d-981b-4cb3-897f-e35f6c20e830?format=jpeg"
          src="https://images.beta.cosmos.so/40fbc749-6796-485b-9588-20204dd7c8f0?format=jpeg"
          alt="Ghost in the shell - Kôkaku kidôtai"
          className="h-32 w-full rounded-lg object-cover grayscale duration-700 group-hover:grayscale-0"
        />
      </Tilt>
      <div className="flex flex-col space-y-0.5 pb-0 pt-3">
        <h3 className="font-mono text-sm font-medium text-zinc-500 dark:text-zinc-400">
          2001: A Space Odyssey
        </h3>
        <p className="text-sm text-black dark:text-white">Stanley Kubrick</p>
      </div>
    </div>
  );
};

const ProfileChessCard = ({ 
  data, 
  departments, 
  selectdepartment, 
  setSelectDepartment, 
  close, 
  updateloading, 
  update, 
  logout 
}) => {
  return (
    <div className="w-auto ml-[10px] mr-[10px] mt-[10px]">
      <Tilt
        rotationFactor={6}
        isRevese
        style={{
          transformOrigin: 'center center',
        }}
        springOptions={{
          stiffness: 26.7,
          damping: 4.1,
          mass: 0.2,
        }}
        className="group relative rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 p-6"
      >
        <Spotlight
          className="z-10 from-white/50 via-white/20 to-white/10 blur-2xl"
          size={248}
          springOptions={{
            stiffness: 26.7,
            damping: 4.1,
            mass: 0.2,
          }}
        />
        <div className="relative z-20">
          <h2 className="text-3xl font-medium text-white mb-2">{data.name}</h2>
          <p className="text-lg text-white mb-1 font-bold">Chest Number: {data.chest_number}</p>
          <p className="text-lg text-white mb-4">
            Department: {data.department} 
          </p>
          
          <div className="flex flex-wrap gap-2 mt-4">
            <Button
              onClick={() => {
                window.open(
                  `whatsapp://send?phone=+918075496634&text=Hi, my profile data is different  id : ${data.username} name : ${data.name}`,
                );
              }}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm"
            >
              Report Issue
            </Button>

            {data.department === 'default' && (
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm">
                    Add Department
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="dark text-white">
                  <div className="h-[300px] w-full">
                    <DrawerHeader>
                      <DrawerTitle>Add your department</DrawerTitle>
                    </DrawerHeader>
                    <div className="flex flex-col items-center m-10">
                      {close === false ? (
                        <div className="flex flex-row justify-spaced">
                          <Select
                            className="dark"
                            onValueChange={(value) => setSelectDepartment(value)}
                          >
                            <SelectTrigger className="w-[180px] dark">
                              <SelectValue placeholder="Add your department" />
                            </SelectTrigger>
                            <SelectContent>
                              {departments.map((i) => {
                                return (
                                  <SelectItem
                                    className="dark"
                                    key={i.toString()}
                                    value={i.toString()}
                                  >
                                    {i}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                          <Button
                            disabled={updateloading === true}
                            className="dark ml-2"
                            type="submit"
                            onClick={() => {
                              update();
                            }}
                          >
                            Submit
                          </Button>
                        </div>
                      ) : (
                        <>
                          <h1 className="text-2xl mb-5 text-white">
                            Successfully added department 🎉
                          </h1>
                          <p className="text-1xl mb-5 text-white">
                            reload the page to view updated data.
                          </p>
                          <DrawerClose asChild>
                            <Button className="w-[300px]">Close</Button>
                          </DrawerClose>
                        </>
                      )}
                    </div>
                  </div>
                </DrawerContent>
              </Drawer>
            )}
            
            <Button
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm"
              onClick={() => {
                logout();
              }}
            >
              Log Out
            </Button>
          </div>
        </div>
      </Tilt>
    </div>
  );
};

export { TiltSpotlight, ProfileChessCard };