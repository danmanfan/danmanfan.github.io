import numpy as np


planck_float = 6.62607015 
planck_e = -34 # the value of the 10th power that is multiplied to planck_float
planck_dim = ""
blotzmann_float = 1.380649 
blotzmann_e = -23 # the value of the 10th power multiplied to blotzmann_float
blotzmann_dim = ""

"""
parameters:
v: Frequency
v_e: Exponent for frequency * 10
T: The absolute temperature of the system
returns:
E_bar: The mean energy of the oscillator
E_e: The exponent to E_bar * 10
"""
def mean_energy_oscillator(v, v_e, T):
    global planck_float
    global planck_e
    global planck_dim
    global blotzmann_float
    global blotzmann_e
    global blotzmann_dim


    E_bar = blotzmann_float * T
    E_e = blotzmann_e

    temp = (planck_float * v) / (blotzmann_float * T)
    temp_e = planck_e + v_e - blotzmann_e 
    temp = temp / (np.exp(temp *(10**temp_e)) - 1)

    E_bar = E_bar * temp
    E_e = E_e + temp_e

    return E_bar, E_e

eb, ee = mean_energy_oscillator(2,14,4000)
print(eb)
print(ee)
