<?php
class Conf {
	private static $database = array (
			'hostname' => 'infolimon.iutmontp.univ-montp2.fr', // localhost
			'database' => 'rletud', // la table est voiture
			'login' => 'rletud',
			'password' => 'rletud' 
	);
	static public function getLogin() {
		return self::$database ['login'];
	}
	static public function getHostname() {
		return self::$database ['hostname'];
	}
	static public function getDatabase() {
		return self::$database ['database'];
	}
	static public function getPassword() {
		return self::$database ['password'];
	}
}
class Model {
	public static $pdo;
	public static function set_static() {
		$host = Conf::getHostname ();
		$dbname = Conf::getDatabase ();
		$login = Conf::getLogin ();
		$pass = Conf::getPassword ();
		try {
			// Connexion Ã  la base de donnÃ©es
			// Le dernier argument sert Ã  ce que toutes les chaines de charactÃ¨res
			// en entrÃ©e et sortie de MySql soit dans le codage UTF-8
			self::$pdo = new PDO ( "mysql:host=$host;dbname=$dbname", $login, $pass, array (
					PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8" 
			) );
			
			// On active le mode d'affichage des erreurs, et le lancement d'exception en cas d'erreur
			self::$pdo->setAttribute ( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
		} catch ( PDOException $ex ) {
			echo $ex->getMessage ();
			die ( 'ProblÃ¨me lors de la connexion Ã  la base de donnÃ©e' );
		}
	}
	public static function selectByName($name) {
		try {
			$table = 'cities';
			$sql = "SELECT * FROM cities WHERE name LIKE :name LIMIT 5";
			// Preparation de la requete
			$req = self::$pdo->prepare ( $sql );
			$name .= "%";
			$req->bindParam ( ':name', $name );
			// execution de la requete
			$req->execute ();
			return $req->fetchAll ( PDO::FETCH_OBJ );
		} catch ( PDOException $e ) {
			echo $e->getMessage ();
			die ( "Erreur lors de la recherche dans la BDD " . static::$table );
		}
	}
	public function selectAll() {
		$sql = "SELECT * FROM cities";
		$rep = Model::$pdo->query ( $sql );
		$rep->setFetchMode ( PDO::FETCH_CLASS, 'Model' );
		return $rep->fetch ();
	}
}

// On initialise la connexifon $pdo un fois pour toufte
Model::set_static ();
$name = $_GET ["name"];
$villes = Model::selectByName ( $name );
json_encode ( $villes );
echo "yolo";
// Remplir ici !
include("Completion.html");
?>
