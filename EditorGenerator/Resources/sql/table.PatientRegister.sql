
CREATE TABLE IF NOT EXISTS `PatientRegister` (
	`id` int(10),
	`token_no` int(10) NOT NULL auto_increment,
	`ohip` numeric(10,0),
	`name` varchar(255),
	`birth_date` date,
	`expiry_date` date,
	`version_code` varchar(255),
	`service_time` time,
	`scan_time` time,
	`wait_time` time,
	`location` numeric(3,0),
	`date` date,
	`comment` varchar(255),
	PRIMARY KEY( `token_no` )
);