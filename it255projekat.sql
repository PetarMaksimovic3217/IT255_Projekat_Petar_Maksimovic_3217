-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 23, 2018 at 10:05 PM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `it255projekat`
--

-- --------------------------------------------------------

--
-- Table structure for table `brod`
--

CREATE TABLE `brod` (
  `id` int(11) NOT NULL,
  `kategorija_id` int(11) NOT NULL,
  `model_id` int(11) NOT NULL,
  `predjeno_milja` int(11) NOT NULL,
  `boja` varchar(15) NOT NULL,
  `broj_putnika` int(11) NOT NULL,
  `registracija` varchar(30) NOT NULL,
  `destinacija_id` int(11) NOT NULL,
  `slika_id` int(11) NOT NULL,
  `cena` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `brod`
--

INSERT INTO `brod` (`id`, `kategorija_id`, `model_id`, `predjeno_milja`, `boja`, `broj_putnika`, `registracija`, `destinacija_id`, `slika_id`, `cena`) VALUES
(1, 3, 16, 2500, 'white', 2, 'CN001-01', 13, 1, 1200),
(2, 3, 2, 1200, 'white', 8, 'BC006-14', 9, 2, 3000),
(3, 3, 20, 6000, 'white', 10, 'SU125-68', 6, 4, 5200),
(4, 3, 21, 250, 'white', 8, 'SP154-69', 5, 5, 4000),
(5, 3, 22, 8900, 'white', 6, 'SP155-22', 5, 6, 3650),
(6, 4, 23, 1250, 'white', 6, 'CN125-98', 2, 7, 4500),
(7, 4, 24, 8900, 'white with yell', 6, 'PM456-12', 9, 8, 2500);

-- --------------------------------------------------------

--
-- Table structure for table `destinacija`
--

CREATE TABLE `destinacija` (
  `id` int(11) NOT NULL,
  `ime` varchar(100) NOT NULL,
  `drzava` varchar(100) NOT NULL,
  `slika` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `destinacija`
--

INSERT INTO `destinacija` (`id`, `ime`, `drzava`, `slika`) VALUES
(2, 'Lefkada', 'Greece', '../assets/slike/lefkada.jpeg'),
(3, 'Kos', 'Greece', '../assets/slike/kos.jpg'),
(4, 'Marina Alimos Kalamaki', 'Greece', '../assets/slike/marinaalimos.jpg'),
(5, 'Split', 'Croatia', '../assets/slike/split.jpg'),
(6, 'Sukosan', 'Croatia', '../assets/slike/sukosan.jpg'),
(7, 'Aci Marina Pula', 'Croatia', '../assets/slike/acimarinapula.jpg'),
(8, 'Ibiza', 'Spain', '../assets/slike/ibiza.jpg'),
(9, 'Palma', 'Spain', '../assets/slike/palma.jpg'),
(10, 'Menorka', 'Spain', '../assets/slike/menorka.jpg'),
(11, 'Hyeres', 'France', '../assets/slike/hyeres.jpg'),
(12, 'Saint Tropez', 'France', '../assets/slike/sttropez.jpg'),
(13, 'Cannes', 'France', '../assets/slike/cannes.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `kategorija`
--

CREATE TABLE `kategorija` (
  `id` int(11) NOT NULL,
  `naziv` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `kategorija`
--

INSERT INTO `kategorija` (`id`, `naziv`) VALUES
(3, 'sailboat'),
(4, 'motorboat'),
(9, 'catamaran');

-- --------------------------------------------------------

--
-- Table structure for table `korisnici`
--

CREATE TABLE `korisnici` (
  `id` int(11) NOT NULL,
  `ime` varchar(50) NOT NULL,
  `prezime` varchar(100) NOT NULL,
  `adresa` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `lozinka` varchar(255) NOT NULL,
  `uloga_id` int(11) NOT NULL,
  `token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `korisnici`
--

INSERT INTO `korisnici` (`id`, `ime`, `prezime`, `adresa`, `email`, `lozinka`, `uloga_id`, `token`) VALUES
(10, 'Marko', 'Markovic', 'Neznanog junaka 9', 'marko@marko.com', '827ccb0eea8a706c4c34a16891f84e7b', 0, '522ba38d78ab871a0eb5d8fa65934bf301f0cc35'),
(12, 'admin', 'admin', 'adminska 1', 'admin@perica.com', '827ccb0eea8a706c4c34a16891f84e7b', 1, '656097fe289eacd99b1f4c7d90e903181a4cd71e'),
(13, 'korisnik', 'korisnik', 'Korisnicka ulica 18', 'korisnik@perica.com', 'c37bf859faf392800d739a41fe5af151', 0, 'e8044956f594b4a0ea742798c2375cc2cd8c33ef');

-- --------------------------------------------------------

--
-- Table structure for table `korpa`
--

CREATE TABLE `korpa` (
  `id` int(11) NOT NULL,
  `idKorisnika` int(11) NOT NULL,
  `flag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `korpa`
--

INSERT INTO `korpa` (`id`, `idKorisnika`, `flag`) VALUES
(7, 10, 2),
(8, 10, 1),
(10, 12, 1),
(11, 13, 2),
(12, 13, 2),
(13, 13, 2),
(14, 13, 1);

-- --------------------------------------------------------

--
-- Table structure for table `model`
--

CREATE TABLE `model` (
  `id` int(11) NOT NULL,
  `proizvodjac_id` int(11) NOT NULL,
  `naziv` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `model`
--

INSERT INTO `model` (`id`, `proizvodjac_id`, `naziv`) VALUES
(1, 2, '64'),
(2, 3, 'Oceanis 45'),
(16, 4, 'mirage 30'),
(17, 4, 'mirage 39'),
(18, 3, 'sense 57'),
(19, 3, 'sense 51'),
(20, 3, 'Oceanis yacht 62'),
(21, 2, 'Sun Odyssey DS 44'),
(22, 2, 'Sun Odyssey 519'),
(23, 3, 'Swift Traveler 50'),
(24, 3, 'Swift Traveler 44');

-- --------------------------------------------------------

--
-- Table structure for table `narudzbina`
--

CREATE TABLE `narudzbina` (
  `id` int(11) NOT NULL,
  `id_korpe` int(11) NOT NULL,
  `id_broda` int(11) NOT NULL,
  `period_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `narudzbina`
--

INSERT INTO `narudzbina` (`id`, `id_korpe`, `id_broda`, `period_id`) VALUES
(33, 7, 2, 1),
(39, 12, 4, 1),
(40, 12, 5, 1),
(41, 13, 6, 64);

-- --------------------------------------------------------

--
-- Table structure for table `period`
--

CREATE TABLE `period` (
  `id` int(11) NOT NULL,
  `naziv` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `period`
--

INSERT INTO `period` (`id`, `naziv`) VALUES
(1, '01/01-07/01'),
(2, '08/01-15/01'),
(3, '16/01-23/01'),
(4, '24/01-31/01'),
(5, '01/02-07/02'),
(6, '08/02-15/02'),
(7, '16/02-23/02'),
(8, '23/02-28/02'),
(9, '01/03-08/03'),
(10, '09/03-16/03'),
(11, '17/03-24/03'),
(12, '25/03-31/03'),
(13, '01/04-08/04'),
(14, '09/04-16/04'),
(15, '17/04-24/04'),
(16, '01/05-07/05'),
(17, '08/05-15/05'),
(18, '16/05-23/05'),
(19, '24/05-31/05'),
(20, '01/06-07/06'),
(21, '08/06-15/06'),
(22, '16/06-23/06'),
(23, '24/06-30/06'),
(24, '01/07-07/07'),
(25, '08/07-15/07'),
(45, '16/07-23/07'),
(46, '24/07-31/07'),
(47, '01/08-07/08'),
(48, '08/08-15/08'),
(49, '16/08-23/08'),
(50, '24/08-31/08'),
(51, '01/09-07-09'),
(52, '08/09-15/09'),
(53, '16/09-23/09'),
(54, '24/09-30/09'),
(55, '01/10-07/10'),
(56, '08/10-15/10'),
(57, '16/10-23/10'),
(58, '24/10-31/10'),
(59, '01/11-07/11'),
(60, '08/11-15/11'),
(61, '16/11-23/11'),
(62, '24-/11-30/11'),
(63, '01/12-07/12'),
(64, '08/12-15/12'),
(65, '16/12-23/12'),
(66, '23/12-30/12');

-- --------------------------------------------------------

--
-- Table structure for table `proizvodjac`
--

CREATE TABLE `proizvodjac` (
  `id` int(11) NOT NULL,
  `naziv` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `proizvodjac`
--

INSERT INTO `proizvodjac` (`id`, `naziv`) VALUES
(1, 'nesto'),
(2, 'jeanneau'),
(3, 'beneteau'),
(4, 'mirrage');

-- --------------------------------------------------------

--
-- Table structure for table `slika`
--

CREATE TABLE `slika` (
  `id` int(11) NOT NULL,
  `link` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `slika`
--

INSERT INTO `slika` (`id`, `link`) VALUES
(1, '../assets/slike/mirage30.jpg'),
(2, '../assets/slike/oceanis45.jpg'),
(3, '../assets/slike/sense57.jpg'),
(4, '../assets/slike/oceanisyacht50.jpg'),
(5, '../assets/slike/odisej44ds.jpg'),
(6, '../assets/slike/odisej519.jpg'),
(7, '../assets/slike/swift50.jpg'),
(8, '../assets/slike/swift44.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `uloga`
--

CREATE TABLE `uloga` (
  `id` int(11) NOT NULL,
  `ime` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `uloga`
--

INSERT INTO `uloga` (`id`, `ime`) VALUES
(0, 'Korisnik'),
(1, 'Administrator');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `brod`
--
ALTER TABLE `brod`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kategorija_id` (`kategorija_id`),
  ADD KEY `model_id` (`model_id`),
  ADD KEY `destinacija_id` (`destinacija_id`),
  ADD KEY `slika_id` (`slika_id`);

--
-- Indexes for table `destinacija`
--
ALTER TABLE `destinacija`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kategorija`
--
ALTER TABLE `kategorija`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `korisnici`
--
ALTER TABLE `korisnici`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uloga_id` (`uloga_id`);

--
-- Indexes for table `korpa`
--
ALTER TABLE `korpa`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idKorisnika` (`idKorisnika`);

--
-- Indexes for table `model`
--
ALTER TABLE `model`
  ADD PRIMARY KEY (`id`),
  ADD KEY `proizvodjac_id` (`proizvodjac_id`);

--
-- Indexes for table `narudzbina`
--
ALTER TABLE `narudzbina`
  ADD PRIMARY KEY (`id`),
  ADD KEY `period_id` (`period_id`),
  ADD KEY `id_korpe` (`id_korpe`),
  ADD KEY `id_broda` (`id_broda`);

--
-- Indexes for table `period`
--
ALTER TABLE `period`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `proizvodjac`
--
ALTER TABLE `proizvodjac`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `slika`
--
ALTER TABLE `slika`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `uloga`
--
ALTER TABLE `uloga`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `brod`
--
ALTER TABLE `brod`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `destinacija`
--
ALTER TABLE `destinacija`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `kategorija`
--
ALTER TABLE `kategorija`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `korisnici`
--
ALTER TABLE `korisnici`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `korpa`
--
ALTER TABLE `korpa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `model`
--
ALTER TABLE `model`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT for table `narudzbina`
--
ALTER TABLE `narudzbina`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;
--
-- AUTO_INCREMENT for table `period`
--
ALTER TABLE `period`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;
--
-- AUTO_INCREMENT for table `proizvodjac`
--
ALTER TABLE `proizvodjac`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `slika`
--
ALTER TABLE `slika`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `brod`
--
ALTER TABLE `brod`
  ADD CONSTRAINT `brod_ibfk_1` FOREIGN KEY (`kategorija_id`) REFERENCES `kategorija` (`id`),
  ADD CONSTRAINT `brod_ibfk_2` FOREIGN KEY (`model_id`) REFERENCES `model` (`id`),
  ADD CONSTRAINT `brod_ibfk_3` FOREIGN KEY (`destinacija_id`) REFERENCES `destinacija` (`id`),
  ADD CONSTRAINT `brod_ibfk_4` FOREIGN KEY (`slika_id`) REFERENCES `slika` (`id`);

--
-- Constraints for table `korisnici`
--
ALTER TABLE `korisnici`
  ADD CONSTRAINT `korisnici_ibfk_1` FOREIGN KEY (`uloga_id`) REFERENCES `uloga` (`id`);

--
-- Constraints for table `korpa`
--
ALTER TABLE `korpa`
  ADD CONSTRAINT `korpa_ibfk_1` FOREIGN KEY (`idKorisnika`) REFERENCES `korisnici` (`id`);

--
-- Constraints for table `model`
--
ALTER TABLE `model`
  ADD CONSTRAINT `model_ibfk_1` FOREIGN KEY (`proizvodjac_id`) REFERENCES `proizvodjac` (`id`);

--
-- Constraints for table `narudzbina`
--
ALTER TABLE `narudzbina`
  ADD CONSTRAINT `narudzbina_ibfk_1` FOREIGN KEY (`period_id`) REFERENCES `period` (`id`),
  ADD CONSTRAINT `narudzbina_ibfk_2` FOREIGN KEY (`id_korpe`) REFERENCES `korpa` (`id`),
  ADD CONSTRAINT `narudzbina_ibfk_3` FOREIGN KEY (`id_broda`) REFERENCES `brod` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
