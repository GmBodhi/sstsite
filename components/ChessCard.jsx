import React, { useState, useEffect } from 'react';
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
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [hasGyroscope, setHasGyroscope] = useState(false);

  useEffect(() => {
    // Check if device has DeviceOrientationEvent
    if (window.DeviceOrientationEvent !== undefined) {
      setHasGyroscope(true);

      // Function to handle device orientation
      const handleDeviceOrientation = (event) => {
        // Get the device orientation data
        const beta = event.beta;  // Front-to-back tilt in degrees
        const gamma = event.gamma; // Left-to-right tilt in degrees
        
        if (beta !== null && gamma !== null) {
          // Limit the range of motion
          const x = Math.min(Math.max(gamma, -15), 15);
          const y = Math.min(Math.max(beta, -15), 15);
          
          setRotation({
            x: -x / 2, // Invert for natural feeling
            y: y / 2
          });
        }
      };

      // Request permission for device motion (required in iOS 13+)
      if (typeof DeviceOrientationEvent !== 'undefined' && 
          typeof DeviceOrientationEvent.requestPermission === 'function') {
        // iOS 13+ devices
        const requestPermission = async () => {
          try {
            const response = await DeviceOrientationEvent.requestPermission();
            if (response === 'granted') {
              window.addEventListener('deviceorientation', handleDeviceOrientation);
            }
          } catch (error) {
            console.error('Error requesting device orientation permission:', error);
          }
        };

        // Add a button to request permission explicitly when needed
        const permissionButton = document.createElement('button');
        permissionButton.innerText = 'Enable Tilt Effect';
        permissionButton.style.position = 'fixed';
        permissionButton.style.bottom = '20px';
        permissionButton.style.right = '20px';
        permissionButton.style.zIndex = '100';
        permissionButton.style.padding = '10px';
        permissionButton.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        permissionButton.style.borderRadius = '5px';
        permissionButton.style.border = 'none';
        permissionButton.style.color = 'white';
        permissionButton.onclick = requestPermission;
        
        document.body.appendChild(permissionButton);
        
        return () => {
          document.body.removeChild(permissionButton);
        };
      } else {
        // Non-iOS or older iOS devices
        window.addEventListener('deviceorientation', handleDeviceOrientation);
        
        // Cleanup
        return () => {
          window.removeEventListener('deviceorientation', handleDeviceOrientation);
        };
      }
    }
  }, []);

  return (
    <div className="w-auto ml-[10px] mr-[10px] mt-[10px]">
      <Tilt
        rotationFactor={6}
        isRevese
        style={{
          transformOrigin: 'center center',
          ...(hasGyroscope ? {
            transform: `perspective(1000px) rotateX(${rotation.y}deg) rotateY(${rotation.x}deg)`
          } : {})
        }}
        springOptions={{
          stiffness: 26.7,
          damping: 4.1,
          mass: 0.2,
        }}
        className="group relative rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 p-6"
        gyroscope={hasGyroscope}
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