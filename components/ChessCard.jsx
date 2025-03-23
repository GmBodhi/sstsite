import React from 'react';
import { Tilt } from "@/components/ui/tilt";
import { Spotlight } from "@/components/ui/spotlight";
import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


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
        className="group relative rounded-lg bg-gradient-to-r from-zinc-900 to-slate-900 p-6 shadow-xl border border-white/10 backdrop-filter backdrop-blur-sm hover:shadow-2xl transition-shadow duration-300"
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
          <div className="absolute top-0 right-0 p-2">
            <img 
              src="/sst.png" 
              alt="SST Logo" 
              className="h-20 w-20 object-cover filter brightness-0 invert opacity-80 select-none"
              draggable="false"
            />
          </div>
          <div className="flex flex-col items-start">
            <div>
              <h2 className="text-3xl font-medium text-white mb-2 select-none">{data.name}</h2>
              <p className="text-lg text-white mb-1 font-bold select-none">Chest Number: {data.chest_number}</p>
              <p className="text-lg text-white mb-4 select-none">
                Department: {data.department} 
              </p>
            </div>
          </div>
          
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

export {  ProfileChessCard };