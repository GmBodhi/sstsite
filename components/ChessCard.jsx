import React, { useState, useEffect, useRef } from 'react';
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
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [debugInfo, setDebugInfo] = useState("");
  const [isGyroActive, setIsGyroActive] = useState(false);

  useEffect(() => {
    let gyroEnabled = false;
    let permissionGranted = false;
    
    // Function to directly manipulate the card tilt based on device orientation
    const handleDeviceOrientation = (event) => {
      if (!permissionGranted) return;
      
      // Extract orientation values - these will vary by device orientation
      const x = event.beta; // -180 to 180 (front/back tilt)
      const y = event.gamma; // -90 to 90 (left/right tilt)
      
      if (x !== null && y !== null) {
        // Convert the values to a reasonable rotation range
        const tiltX = Math.max(-10, Math.min(10, y / 3)); // Divide to reduce sensitivity
        const tiltY = Math.max(-10, Math.min(10, x / 6)); // Front/back needs more dampening
        
        // Apply transformation directly to the card element for more responsive effect
        if (cardRef.current) {
          cardRef.current.style.transform = `perspective(1000px) rotateY(${tiltX}deg) rotateX(${-tiltY}deg)`;
        }
        
        // Update debug info
        setDebugInfo(`Beta: ${x.toFixed(1)}°, Gamma: ${y.toFixed(1)}°, Tilt: ${tiltX.toFixed(1)}°, ${tiltY.toFixed(1)}°`);
      }
    };

    // Function to request gyroscope permission on iOS
    const requestGyroPermission = async () => {
      try {
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
          // For iOS 13+
          const permission = await DeviceOrientationEvent.requestPermission();
          if (permission === 'granted') {
            permissionGranted = true;
            window.addEventListener('deviceorientation', handleDeviceOrientation, true);
            setDebugInfo("iOS permission granted");
            setIsGyroActive(true);
            gyroEnabled = true;
          } else {
            setDebugInfo("Permission denied");
          }
        } else {
          // For non-iOS devices, permission is not required
          permissionGranted = true;
          window.addEventListener('deviceorientation', handleDeviceOrientation, true);
          setDebugInfo("Non-iOS device - gyro active");
          setIsGyroActive(true);
          gyroEnabled = true;
        }
      } catch (error) {
        setDebugInfo(`Error: ${error.message}`);
        console.error("Gyroscope error:", error);
      }
    };

    // Create a button for iOS permission
    const createPermissionButton = () => {
      const existingButton = document.getElementById('gyro-permission-btn');
      
      if (!existingButton) {
        const btn = document.createElement('button');
        btn.id = 'gyro-permission-btn';
        btn.innerText = 'Enable Tilt';
        btn.style.position = 'fixed';
        btn.style.bottom = '20px';
        btn.style.right = '20px';
        btn.style.backgroundColor = 'rgba(59, 130, 246, 0.7)';
        btn.style.color = 'white';
        btn.style.padding = '8px 16px';
        btn.style.borderRadius = '8px';
        btn.style.border = 'none';
        btn.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        btn.style.zIndex = '9999';
        btn.style.fontSize = '14px';
        
        btn.addEventListener('click', async () => {
          await requestGyroPermission();
          btn.style.display = 'none'; // Hide after permission granted
        });
        
        document.body.appendChild(btn);
        return btn;
      }
      
      return existingButton;
    };

    // Check if device orientation is available
    if (window.DeviceOrientationEvent !== undefined) {
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        // iOS requires explicit permission
        const permissionBtn = createPermissionButton();
      } else {
        // Android and other devices
        requestGyroPermission();
      }
    } else {
      setDebugInfo("Device orientation not supported");
    }

    // Cleanup function
    return () => {
      if (gyroEnabled) {
        window.removeEventListener('deviceorientation', handleDeviceOrientation, true);
      }
      
      const btn = document.getElementById('gyro-permission-btn');
      if (btn) {
        document.body.removeChild(btn);
      }
    };
  }, []);

  // Function to manually trigger permission if needed
  const triggerPermission = async () => {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const permission = await DeviceOrientationEvent.requestPermission();
        if (permission === 'granted') {
          setDebugInfo("Permission granted via button");
          setIsGyroActive(true);
          const btn = document.getElementById('gyro-permission-btn');
          if (btn) btn.style.display = 'none';
        }
      } catch (error) {
        setDebugInfo(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="w-auto ml-[10px] mr-[10px] mt-[10px]">
      <div
        ref={cardRef}
        className="group relative rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 p-6 transition-all duration-200"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'perspective(1000px)',
          transformOrigin: 'center center',
        }}
      >
        <Spotlight
          className="z-10 from-white/50 via-white/20 to-white/10 blur-2xl"
          size={248}
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

            {!isGyroActive && (
              <Button
                className="bg-blue-500/70 hover:bg-blue-600/70 backdrop-blur-sm"
                onClick={triggerPermission}
              >
                Enable Tilt
              </Button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export { TiltSpotlight, ProfileChessCard };